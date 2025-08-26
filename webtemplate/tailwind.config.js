/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.php"],
  safelist: [
    'opacity-100',
    'translate-y-0',
    'transition-all',
    'duration-700',
  ],
  theme: {
    extend: {
      colors: {
        // Map brand palette to CSS variables (single source of truth in styles.css)
        brand: {
          black: 'var(--color-black)',
          white: 'var(--color-white)',
          red: 'var(--color-iuh-red)',
          green: 'var(--color-storm-cloud)',
          blue: 'var(--color-french-blue)',
          yellow: 'var(--color-mayonnaise)',
          gray: 'var(--color-neutral-porcelain)',
          cyan: 'var(--color-french-blue)',
        },
        // Semantic shortcuts
        primary: 'var(--color-iuh-red)',
        accent: 'var(--color-french-blue)',
        neutral: 'var(--color-neutral-porcelain)',
        emphasis: 'var(--color-storm-cloud)',
      },
      fontFamily: {
        // Brand stack with Acme Gothic primary and fallbacks per guide
        sans: [
          "Acme Gothic",
          "Oswald",
          "Arial Narrow",
          "Arial",
          "Helvetica",
          "sans-serif",
        ],
        oswald: [
          "Acme Gothic",
          "Oswald",
          "Arial Narrow",
          "Arial",
          "Helvetica",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
}

