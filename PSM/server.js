// server.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  let browser;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Improved: Extract floorplan names and prices only
    const data = await page.evaluate(() => {
      // Helper to extract floorplan cards/blocks
      function extractFloorplans() {
        // Try common selectors for floorplan cards
        const selectors = [
          '[class*="floorplan"]', '[class*="fp-card"]', '[class*="plan-card"]', '[class*="unit"]', '[class*="card"]', 'article', 'section', 'div'
        ];
        let results = [];
        for (const sel of selectors) {
          const els = Array.from(document.querySelectorAll(sel));
          for (const el of els) {
            const txt = el.innerText;
            // Heuristic: must mention bed/bath and price
            if (/\b(\d+\s*bed|bedroom|floor plan|plan)\b/i.test(txt) && /\$[\d,.]+/.test(txt)) {
              // Try to extract name and price
              let name = '';
              let prices = [];
              // Name: first line or before price
              const lines = txt.split('\n').map(l => l.trim()).filter(Boolean);
              for (const line of lines) {
                if (/\b(\d+\s*bed|bedroom|floor plan|plan)\b/i.test(line)) {
                  name = line;
                  break;
                }
              }
              if (!name && lines.length > 0) name = lines[0];
              // Prices: all $... in text
              const priceMatches = txt.match(/\$[\d,.]+/g);
              if (priceMatches) prices = priceMatches;
              if (name && prices.length > 0) {
                results.push({ name, prices });
              }
            }
          }
          if (results.length > 0) break; // Prefer most specific selector
        }
        // Fallback: regex from all text
        if (results.length === 0) {
          const allText = document.body.innerText;
          const regex = /(\w[\w\s\-]+)\s*\$([\d,]+)/g;
          let m;
          while ((m = regex.exec(allText))) {
            results.push({ name: m[1].trim(), price: `${m[2]}` });
          }
        }
        return results;
      }
      // Improved specials extraction: headings, banners, bold, promo classes, plus regex
      function extractSpecials() {
        const specials = [];
        const promoKeywords = /special|promotion|offer|discount|deal|save|free|move[- ]?in|bonus|waived|first month|limited time|sign now|credit|gift|exclusive|today only|now leasing|apply now|rent credit|gift card|lease now|ends soon|act now/i;
        // OneEaston.com: Target hero heading and next h2 for specials
        const heroHeading = document.querySelector('p.heading.h1, h1.heading, h1.h1, p.h1');
        if (heroHeading && promoKeywords.test(heroHeading.innerText)) {
          specials.push(heroHeading.innerText.trim());
          // Try to get the next h2 or .content h2 after the hero
          let next = heroHeading.nextElementSibling;
          while (next && next.tagName !== 'H2') next = next.nextElementSibling;
          if (next && promoKeywords.test(next.innerText)) {
            specials.push(next.innerText.trim());
          }
        }
        // Headings
        document.querySelectorAll('h1,h2,h3,h4').forEach(el => {
          if (promoKeywords.test(el.innerText)) specials.push(el.innerText.trim());
        });
        // Bold/strong
        document.querySelectorAll('b,strong').forEach(el => {
          if (promoKeywords.test(el.innerText)) specials.push(el.innerText.trim());
        });
        // Promo-related classes
        document.querySelectorAll('[class*="special"], [class*="promo"], [class*="offer"], [class*="deal"], [class*="waiv"], [class*="save"], [class*="discount"]').forEach(el => {
          if (promoKeywords.test(el.innerText)) specials.push(el.innerText.trim());
        });
        // Any element with a promo keyword and enough length
        document.querySelectorAll('body *').forEach(el => {
          const txt = el.innerText && el.innerText.trim();
          if (txt && promoKeywords.test(txt) && txt.length > 15) specials.push(txt);
        });
        // Fallback: get full lines containing promo keywords
        const text = document.body.innerText;
        text.split(/\n|\r/).forEach(line => {
          if (promoKeywords.test(line) && line.trim().length > 15) specials.push(line.trim());
        });
        return specials;
      }
      return {
        specials: [...new Set(extractSpecials())],
        floorplans: extractFloorplans()
      };
    });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (browser) await browser.close();
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Scraper server running on port ${PORT}`));