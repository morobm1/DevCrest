const React = window.React;

const allProperties = [
  "Academy Chorro", "Academy Palomar", "Blattner Hall", "Bryan Flats", "Century Hall", "Cerca Apartments",
  "College Campanile Apartments", "Comma Barrington", "Ferry Street Flats", "Florida Polytechnic University - Phase I",
  "Florida Polytechnic University - Phase II", "Florida Polytechnic University - Phase III", "Founders Hall",
  "Infinity Hall", "Ivory University House", "Lantana Hall", "M@College", "Meridian on Main", "Mines Park",
  "Monte Apartments", "Mountain View Hall", "Nexus on Holmes", "Prisma Apartments", "River House Graduate Housing",
  "Stateside Apartments", "The Continuum for UF Grads", "The Harbour at Orange Coast College",
  "The Residential Village at UW Bothell", "VIVA 5750", "Zuma Apartments"
];

const eventTypeOptions = [
  "Lease-Up",
  "Renewal",
  "Brand Awareness",
  "Tabling/Event",
  "Digital Push",
  "Other"
];

function NavBar({ activeTab, onTabChange, user, onLogout }) {
  const sidebarStyle = {
    width: 220,
    background: '#222e3c',
    color: '#fff',
    height: '100vh',
    padding: '32px 0',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'fixed',
    left: 0,
    top: 0,
    boxShadow: '2px 0 8px rgba(0,0,0,0.07)'
  };
  const navLinkStyle = {
    display: 'block',
    width: '100%',
    padding: '12px 32px',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 6,
    margin: '4px 0',
    fontWeight: 500,
    fontSize: 16,
    transition: 'background 0.2s',
    cursor: 'pointer',
  };
  const navLinkActive = { background: '#30405a' };
  const navLinkHover = { background: '#30405a' };
  function handleMouseOver(e) { Object.assign(e.target.style, navLinkHover); }
  function handleMouseOut(e) { if (e.target.dataset.active !== 'true') Object.keys(navLinkHover).forEach(k => { e.target.style[k] = ''; }); }
  return React.createElement('aside', { style: sidebarStyle },
    React.createElement('img', {
      src: './images/capstone-logo.png',
      alt: 'Company Logo',
      style: {
        width: 120,
        height: 'auto',
        marginBottom: 24,
        display: 'block',
        borderRadius: 8,
        background: '#fff',
        padding: 8
      }
    }),
    React.createElement('h2', { style: { marginBottom: 32, fontSize: 22, fontWeight: 700, letterSpacing: 1 } }, 'Multi-Tool'),
    React.createElement('nav', { style: { width: '100%' } },
      ['Marketing Calendar', 'Dashboard', 'Market Insight', 'Campaign Manager', 'Social Media Audit', 'Tools', 'Settings'].map(tab =>
        React.createElement('a', {
          key: tab,
          style: Object.assign({}, navLinkStyle, activeTab === tab ? navLinkActive : {}),
          onMouseOver: handleMouseOver,
          onMouseOut: handleMouseOut,
          onClick: () => onTabChange(tab),
          'data-active': activeTab === tab ? 'true' : undefined,
        }, tab)
      )
    ),
    React.createElement('div', { style: { marginTop: 32 } },
      React.createElement('button', {
        onClick: onLogout,
        style: { background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', cursor: 'pointer', fontWeight: 500, width: '80%' }
      }, 'Logout'),
      React.createElement('div', { style: { color: '#fff', marginTop: 10, fontSize: 14, textAlign: 'center' } }, user)
    )
  );
}

function MarketingCalendar() {
  const [month, setMonth] = React.useState(() => new Date().getMonth());
  const [year, setYear] = React.useState(() => new Date().getFullYear());
  const [modalOpen, setModalOpen] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  function handleMonthChange(offset) {
    let newMonth = month + offset;
    let newYear = year;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    setMonth(newMonth);
    setYear(newYear);
  }
  function handleSaveEvent(event) {
    setEvents([...events, event]);
    setModalOpen(false);
  }
  return React.createElement('div', null,
    React.createElement('h1', null, 'Marketing Calendar'),
    React.createElement('button', {
      style: { background: '#30405a', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', marginBottom: 28, boxShadow: '0 2px 8px rgba(48,64,90,0.10)' },
      onClick: () => setModalOpen(true)
    }, 'Add Campaign Event'),
    modalOpen && React.createElement(CampaignEventModal, { onClose: () => setModalOpen(false), onSave: handleSaveEvent }),
    React.createElement(CalendarMonthView, {
      month,
      year,
      onMonthChange: handleMonthChange
    })
  );
}
function CampaignEventModal({ onClose, onSave }) {
  const [form, setForm] = React.useState({ eventTitle: '', eventType: '', startDate: '', endDate: '', description: '', assignedTo: '', isActive: true });
  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm(f => ({ ...f, [name]: checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }
  return React.createElement('div', {
    style: {
      position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    onClick: onClose
  },
    React.createElement('div', {
      style: { background: '#fff', borderRadius: 16, padding: 40, minWidth: 400, maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 4px 24px rgba(0,0,0,0.13)', position: 'relative', fontFamily: 'inherit' },
      onClick: e => e.stopPropagation()
    },
      React.createElement('button', { onClick: onClose, style: { position: 'absolute', top: 16, right: 16, background: '#f44336', color: '#fff', border: 'none', borderRadius: '50%', width: 32, height: 32, fontSize: 20, cursor: 'pointer' } }, '×'),
      React.createElement('h2', { style: { marginBottom: 18, textAlign: 'center', color: '#30405a', fontSize: 28 } }, 'Add Campaign Event'),
      React.createElement('form', { onSubmit: handleSubmit },
        React.createElement('div', { style: { marginBottom: 12 } },
          React.createElement('label', null, 'Event Title*'),
          React.createElement('input', { name: 'eventTitle', value: form.eventTitle, onChange: handleChange, required: true, style: { width: '100%' } })
        ),
        React.createElement('div', { style: { marginBottom: 12 } },
          React.createElement('label', null, 'Event Type*'),
          React.createElement('select', { name: 'eventType', value: form.eventType, onChange: handleChange, required: true, style: { width: '100%' } },
            React.createElement('option', { value: '' }, 'Select'),
            eventTypeOptions.map(type => React.createElement('option', { key: type, value: type }, type))
          )
        ),
        React.createElement('div', { style: { marginBottom: 12, display: 'flex', gap: 8 } },
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('label', null, 'Start Date*'),
            React.createElement('input', { name: 'startDate', type: 'date', value: form.startDate, onChange: handleChange, required: true, style: { width: '100%' } })
          ),
          React.createElement('div', { style: { flex: 1 } },
            React.createElement('label', null, 'End Date'),
            React.createElement('input', { name: 'endDate', type: 'date', value: form.endDate, onChange: handleChange, style: { width: '100%' } })
          )
        ),
        React.createElement('div', { style: { marginBottom: 12 } },
          React.createElement('label', null, 'Description'),
          React.createElement('textarea', { name: 'description', value: form.description, onChange: handleChange, style: { width: '100%' } })
        ),
        React.createElement('div', { style: { marginBottom: 12 } },
          React.createElement('label', null, 'Assigned To'),
          React.createElement('input', { name: 'assignedTo', value: form.assignedTo, onChange: handleChange, style: { width: '100%' } })
        ),
        React.createElement('div', { style: { marginBottom: 12 } },
          React.createElement('label', null, 'Active?'),
          React.createElement('input', { name: 'isActive', type: 'checkbox', checked: form.isActive, onChange: handleChange, style: { marginLeft: 8 } })
        ),
        React.createElement('div', { style: { marginTop: 18, display: 'flex', gap: 8, justifyContent: 'center' } },
          React.createElement('button', {
            type: 'submit',
            style: { background: '#30405a', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(48,64,90,0.10)' }
          }, 'Save'),
          React.createElement('button', {
            type: 'button',
            onClick: onClose,
            style: { background: '#f44336', color: '#fff', padding: '12px 32px', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: 18, cursor: 'pointer', boxShadow: '0 2px 8px rgba(48,64,90,0.10)' }
          }, 'Cancel')
        )
      )
    )
  );
}
function CalendarMonthView({ month, year, onMonthChange }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return React.createElement('div', { style: { background: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', width: '100%', marginBottom: 24 } },
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
      React.createElement('button', { onClick: () => onMonthChange(-1), style: { background: '#eee', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' } }, '◀'),
      React.createElement('h3', { style: { textAlign: 'center', margin: 0 } },
        new Date(year, month).toLocaleString('default', { month: 'long' }), ' ', year),
      React.createElement('button', { onClick: () => onMonthChange(1), style: { background: '#eee', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer' } }, '▶')
    ),
    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 } },
      ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => React.createElement('div', { key: d, style: { fontWeight: 600, textAlign: 'center' } }, d)),
      days.map((d, i) => React.createElement('div', {
        key: i,
        style: {
          minHeight: 48,
          textAlign: 'center',
          lineHeight: '48px',
          background: d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? '#30405a' : 'none',
          color: d === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? '#fff' : '#222',
          borderRadius: d === new Date().getDate() ? '50%' : 'none',
          fontWeight: d === new Date().getDate() ? 700 : 400,
          border: '1px solid #eee',
          position: 'relative',
          overflow: 'visible',
        }
      }, d || ''))
    )
  );
}
function Dashboard() {
  // Get current user and their allowed properties
  const currentUser = window.localStorage.getItem('currentUser');
  const users = JSON.parse(window.localStorage.getItem('users') || '{}');
  const allowedProperties = (users[currentUser] && users[currentUser].properties) || [];

  // Example leasing data for demonstration
  const leasingData = allowedProperties.map((property, idx) => ({
    property,
    leased: Math.floor(Math.random() * 200) + 50, // random leased units
    available: Math.floor(Math.random() * 50) + 10, // random available units
    avgRent: Math.floor(Math.random() * 1000) + 800 // random average rent
  }));
  const totalLeased = leasingData.reduce((sum, p) => sum + p.leased, 0);
  const totalAvailable = leasingData.reduce((sum, p) => sum + p.available, 0);
  const totalUnits = totalLeased + totalAvailable;
  const occupancyRate = totalUnits > 0 ? ((totalLeased / totalUnits) * 100).toFixed(1) : '0.0';

  // Marketing Budget Tracker State
  const [budgetItems, setBudgetItems] = React.useState(() => {
    // Persist to localStorage by user
    const key = `budgetItems_${currentUser}`;
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  });
  const [budgetForm, setBudgetForm] = React.useState({ campaign: '', amount: '', date: '', notes: '' });
  const [budgetMsg, setBudgetMsg] = React.useState('');

  function handleBudgetChange(e) {
    const { name, value } = e.target;
    setBudgetForm(f => ({ ...f, [name]: value }));
  }
  function handleBudgetSubmit(e) {
    e.preventDefault();
    if (!budgetForm.campaign || !budgetForm.amount || !budgetForm.date) {
      setBudgetMsg('Please fill all required fields.');
      return;
    }
    const newItem = { ...budgetForm, amount: parseFloat(budgetForm.amount) };
    const newItems = [...budgetItems, newItem];
    setBudgetItems(newItems);
    window.localStorage.setItem(`budgetItems_${currentUser}`, JSON.stringify(newItems));
    setBudgetForm({ campaign: '', amount: '', date: '', notes: '' });
    setBudgetMsg('Budget item added!');
    setTimeout(() => setBudgetMsg(''), 1500);
  }
  const totalSpent = budgetItems.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  return React.createElement('div', null,
    React.createElement('h1', { style: { marginBottom: 24 } }, 'Leasing Dashboard'),
    React.createElement('div', { style: { display: 'flex', gap: 32, marginBottom: 32 } },
      React.createElement('div', { style: { background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: 180 } },
        React.createElement('div', { style: { fontSize: 32, fontWeight: 700, color: '#30405a' } }, totalUnits),
        React.createElement('div', { style: { color: '#888', fontSize: 16 } }, 'Total Units')
      ),
      React.createElement('div', { style: { background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: 180 } },
        React.createElement('div', { style: { fontSize: 32, fontWeight: 700, color: '#388e3c' } }, totalLeased),
        React.createElement('div', { style: { color: '#888', fontSize: 16 } }, 'Leased Units')
      ),
      React.createElement('div', { style: { background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', minWidth: 180 } },
        React.createElement('div', { style: { fontSize: 32, fontWeight: 700, color: '#1976d2' } }, `${occupancyRate}%`),
        React.createElement('div', { style: { color: '#888', fontSize: 16 } }, 'Occupancy Rate')
      )
    ),
    React.createElement('h2', { style: { margin: '32px 0 12px 0' } }, 'Leasing by Property'),
    React.createElement('div', { style: { overflowX: 'auto' } },
      React.createElement('table', { style: { width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderCollapse: 'collapse', fontSize: 15 } },
        React.createElement('thead', null,
          React.createElement('tr', { style: { background: '#f4f6fa' } },
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Property'),
            React.createElement('th', { style: { padding: 12, textAlign: 'right' } }, 'Leased'),
            React.createElement('th', { style: { padding: 12, textAlign: 'right' } }, 'Available'),
            React.createElement('th', { style: { padding: 12, textAlign: 'right' } }, 'Avg Rent ($)')
          )
        ),
        React.createElement('tbody', null,
          leasingData.map(row =>
            React.createElement('tr', { key: row.property },
              React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee' } }, row.property),
              React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee', textAlign: 'right' } }, row.leased),
              React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee', textAlign: 'right' } }, row.available),
              React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee', textAlign: 'right' } }, row.avgRent)
            )
          )
        )
      )
    ),
    // Marketing Budget Tracker Section
    React.createElement('h2', { style: { margin: '40px 0 12px 0', color: '#1976d2' } }, 'Marketing Budget Tracker'),
    React.createElement('form', { onSubmit: handleBudgetSubmit, style: { background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' } },
      React.createElement('div', { style: { flex: 2, minWidth: 180 } },
        React.createElement('label', null, 'Campaign*'),
        React.createElement('input', { name: 'campaign', value: budgetForm.campaign, onChange: handleBudgetChange, style: { width: '100%' }, required: true })
      ),
      React.createElement('div', { style: { flex: 1, minWidth: 120 } },
        React.createElement('label', null, 'Amount ($)*'),
        React.createElement('input', { name: 'amount', type: 'number', min: 0, step: '0.01', value: budgetForm.amount, onChange: handleBudgetChange, style: { width: '100%' }, required: true })
      ),
      React.createElement('div', { style: { flex: 1, minWidth: 140 } },
        React.createElement('label', null, 'Date*'),
        React.createElement('input', { name: 'date', type: 'date', value: budgetForm.date, onChange: handleBudgetChange, style: { width: '100%' }, required: true })
      ),
      React.createElement('div', { style: { flex: 2, minWidth: 180 } },
        React.createElement('label', null, 'Notes'),
        React.createElement('input', { name: 'notes', value: budgetForm.notes, onChange: handleBudgetChange, style: { width: '100%' } })
      ),
      React.createElement('button', { type: 'submit', style: { background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', minWidth: 120 } }, 'Add'),
      budgetMsg && React.createElement('div', { style: { color: '#388e3c', fontWeight: 600, marginLeft: 12 } }, budgetMsg)
    ),
    React.createElement('div', { style: { overflowX: 'auto' } },
      React.createElement('table', { style: { width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', borderCollapse: 'collapse', fontSize: 15 } },
        React.createElement('thead', null,
          React.createElement('tr', { style: { background: '#f4f6fa' } },
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Campaign'),
            React.createElement('th', { style: { padding: 12, textAlign: 'right' } }, 'Amount ($)'),
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Date'),
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Notes')
          )
        ),
        React.createElement('tbody', null,
          budgetItems.length === 0 ?
            React.createElement('tr', null,
              React.createElement('td', { colSpan: 4, style: { padding: 16, textAlign: 'center', color: '#888' } }, 'No budget items yet.')
            ) :
            budgetItems.map((item, idx) =>
              React.createElement('tr', { key: idx },
                React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee' } }, item.campaign),
                React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee', textAlign: 'right' } }, item.amount.toFixed(2)),
                React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee' } }, item.date),
                React.createElement('td', { style: { padding: 10, borderBottom: '1px solid #eee' } }, item.notes)
              )
            )
        )
      )
    ),
    React.createElement('div', { style: { marginTop: 16, fontWeight: 600, fontSize: 17, color: '#1976d2', textAlign: 'right' } }, `Total Spent: ${totalSpent.toFixed(2)}`)
  );
}
function CampaignManager() {
  return React.createElement('div', null,
    React.createElement('h1', null, 'Campaign Manager'),
    React.createElement('p', null, 'This is the campaign manager. Add campaign features here.')
  );
}
function SocialMediaAudit() {
  return React.createElement('div', null,
    React.createElement('h1', null, 'Social Media Audit'),
    React.createElement('p', null, 'This is the social media audit tab. Add social media monitoring here.')
  );
}

// Market Insight Tab
function MarketInsight() {
  const currentUser = window.localStorage.getItem('currentUser');
  const users = JSON.parse(window.localStorage.getItem('users') || '{}');
  const allowedProperties = (users[currentUser] && users[currentUser].properties) || [];
  // compsData: { [property]: [ { name, yearBuilt, distance, website, floorplans, specials, lastScraped } ] }
  const [compsData, setCompsData] = React.useState(() => {
    const key = `compsData_${currentUser}`;
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  });
  const [form, setForm] = React.useState({ property: allowedProperties[0] || '', name: '', yearBuilt: '', distance: '', website: '', floorplans: '' });
  const [msg, setMsg] = React.useState('');

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  function handleAddComp(e) {
    e.preventDefault();
    if (!form.property || !form.name) {
      setMsg('Property and competitor name required.');
      return;
    }
    const newComp = {
      name: form.name,
      yearBuilt: form.yearBuilt,
      distance: form.distance,
      website: form.website,
      floorplans: form.floorplans,
      specials: '',
      lastScraped: ''
    };
    const newComps = { ...compsData };
    if (!newComps[form.property]) newComps[form.property] = [];
    newComps[form.property].push(newComp);
    setCompsData(newComps);
    window.localStorage.setItem(`compsData_${currentUser}`, JSON.stringify(newComps));
    setForm(f => ({ ...f, name: '', yearBuilt: '', distance: '', website: '', floorplans: '' }));
    setMsg('Competitor added!');
    setTimeout(() => setMsg(''), 1200);
  }
  function handleDeleteComp(property, idx) {
    const newComps = { ...compsData };
    newComps[property].splice(idx, 1);
    setCompsData(newComps);
    window.localStorage.setItem(`compsData_${currentUser}`, JSON.stringify(newComps));
  }
  async function handleScrape(property, idx) {
    const newComps = { ...compsData };
    const now = new Date().toLocaleString();
    const comp = newComps[property][idx];
    const proxyUrl = 'https://corsproxy.io/?';
    const mainUrl = comp.website;
    const floorplanUrl = comp.floorplans;
    if (!mainUrl && !floorplanUrl) {
      comp.specials = 'No website or floorplans URL provided.';
      comp.lastScraped = now;
      setCompsData(newComps);
      window.localStorage.setItem(`compsData_${currentUser}`, JSON.stringify(newComps));
      return;
    }
    try {
      // Helper to fetch and parse HTML
      async function fetchDoc(url) {
        if (!url) return null;
        const res = await fetch(proxyUrl + encodeURIComponent(url));
        const html = await res.text();
        const parser = new window.DOMParser();
        return parser.parseFromString(html, 'text/html');
      }
      // Scrape floorplans and rates from floorplan page
      let floorplanData = [];
      let specials = [];
      let docFloor = await fetchDoc(floorplanUrl);
      function extractHumanSpecials(doc) {
        if (!doc) return [];
        let texts = [];
        function getTextNodes(node) {
          if (node.nodeType === 3) {
            texts.push(node.textContent);
          } else if (node.nodeType === 1 && node.childNodes) {
            for (let i = 0; i < node.childNodes.length; i++) {
              getTextNodes(node.childNodes[i]);
            }
          }
        }
        getTextNodes(doc.body);
        // Add text from common promo/banner elements
        const promoSelectors = [
          '.banner', '.promo', '.promotion', '.special', '.offer', '.announcement', '#announcement', '.notice', '.alert', '.deal', '.discount', '.move-in', '.hero', '.headline', '.lead', '.marquee', '.feature', '.highlight', '.splash', '.cta', '.main-message', '.main-banner', '.main-promo', '.main-special', '.main-offer', '.main-announcement', '.main-alert', '.main-deal', '.main-discount', '.main-move-in', '.main-hero', '.main-headline', '.main-lead', '.main-marquee', '.main-feature', '.main-highlight', '.main-splash', '.main-cta'
        ];
        promoSelectors.forEach(sel => {
          doc.querySelectorAll(sel).forEach(el => {
            if (el && el.textContent) texts.push(el.textContent);
          });
        });
        // Add alt text from images with keywords
        Array.from(doc.images || []).forEach(img => {
          if (img.alt && img.alt.length < 120) texts.push(img.alt);
        });
        // Filter for lines with specials/promotions keywords
        const keywords = /special|promotion|offer|discount|deal|save|free|limited|exclusive|bonus|move-in|parking|gift|credit|incentive|reduced|waived|application|admin|fee|now leasing|today only|limited time|first month|off/i;
        let specials = texts
          .map(t => t.replace(/\s+/g, ' ').trim())
          .filter(t => t.length > 0 && t.length < 120 && keywords.test(t))
          .filter(t => !/[{};=]|function|var |let |const |\.js|\.css|\.json|gtag|dataLayer|form_id|Saved|createElem|regex|browser|navigator|window|document|return|value:|key:|supportsLinkPrefetch|connection|saveData|this\./i.test(t))
          .map(t => t.replace(/<[^>]+>/g, ''))
          .filter(t => !/office hours|leasing office|contact us|call us|visit us|schedule a tour|apply now|now leasing|hours of operation|open hours|closed/i.test(t));
        return [...new Set(specials)];
      }
      if (docFloor) {
        let cards = docFloor.querySelectorAll('.fp-card');
        if (cards.length > 0) {
          cards.forEach(card => {
            let name = card.querySelector('.fp-card__title');
            let price = card.querySelector('.fp-card__price');
            floorplanData.push({
              name: name ? name.textContent.trim() : 'Unknown',
              price: price ? price.textContent.trim() : 'N/A'
            });
          });
        }
        if (floorplanData.length === 0) {
          cards = docFloor.querySelectorAll('.floorplan-card, .floorplan, .card, .unit, .plan');
          if (cards.length === 0) cards = docFloor.querySelectorAll('[class*="floor"]');
          if (cards.length === 0) cards = docFloor.querySelectorAll('article, section');
          cards.forEach(card => {
            let name = card.querySelector('.floorplan-title, .fp-title, .title, h2, h3, .name');
            if (!name) name = card.querySelector('[class*="title"], [class*="name"]');
            let price = card.querySelector('.floorplan-price, .fp-price, .price, .starting, .rate, [class*="price"]');
            if (!price) price = card.textContent.match(/\$[\d,]+/);
            floorplanData.push({
              name: name ? name.textContent.trim() : 'Unknown',
              price: price ? (price.textContent ? price.textContent.trim() : price[0]) : 'N/A'
            });
          });
        }
        if (floorplanData.length === 0) {
          const allText = docFloor.body.textContent;
          const regex = /(\w[\w\s\-]+)\s*\$([\d,]+)/g;
          let m;
          while ((m = regex.exec(allText))) {
            floorplanData.push({ name: m[1].trim(), price: `${m[2]}` });
          }
        }
        // Human-readable specials/promotions from floorplan page
        specials.push(...extractHumanSpecials(docFloor));
      }
      // Human-readable specials/promotions from main website
      let docMain = await fetchDoc(mainUrl);
      if (docMain) {
        specials.push(...extractHumanSpecials(docMain));
      }
      comp.floorplanData = floorplanData;
      comp.specials = specials.length > 0 ? specials.join(' | ') : 'No specials/promotions found.';
      comp.lastScraped = now;
      setCompsData(newComps);
      window.localStorage.setItem(`compsData_${currentUser}`, JSON.stringify(newComps));
    } catch (e) {
      comp.specials = 'Scrape failed: ' + (e && e.message ? e.message : e);
      comp.lastScraped = now;
      setCompsData(newComps);
      window.localStorage.setItem(`compsData_${currentUser}`, JSON.stringify(newComps));
      window.alert('Scraping failed. Error: ' + (e && e.message ? e.message : e));
      console.error('Scraping error:', e);
    }
  }

  return React.createElement('div', null,
    React.createElement('h1', { style: { marginBottom: 24 } }, 'Market Insight'),
    React.createElement('form', { onSubmit: handleAddComp, style: { background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' } },
      React.createElement('div', { style: { flex: 2, minWidth: 180 } },
        React.createElement('label', null, 'Property*'),
        React.createElement('select', { name: 'property', value: form.property, onChange: handleFormChange, style: { width: '100%' }, required: true },
          allowedProperties.map(p => React.createElement('option', { key: p, value: p }, p))
        )
      ),
      React.createElement('div', { style: { flex: 2, minWidth: 180 } },
        React.createElement('label', null, 'Competitor Name*'),
        React.createElement('input', { name: 'name', value: form.name, onChange: handleFormChange, style: { width: '100%' }, required: true })
      ),
      React.createElement('div', { style: { flex: 1, minWidth: 120 } },
        React.createElement('label', null, 'Year Built'),
        React.createElement('input', { name: 'yearBuilt', value: form.yearBuilt, onChange: handleFormChange, style: { width: '100%' } })
      ),
      React.createElement('div', { style: { flex: 1, minWidth: 120 } },
        React.createElement('label', null, 'Distance from Campus (mi)'),
        React.createElement('input', { name: 'distance', value: form.distance, onChange: handleFormChange, style: { width: '100%' } })
      ),
      React.createElement('div', { style: { flex: 2, minWidth: 180 } },
        React.createElement('label', null, 'Website'),
        React.createElement('input', { name: 'website', value: form.website, onChange: handleFormChange, style: { width: '100%' } })
      ),
      React.createElement('div', { style: { flex: 2, minWidth: 180 } },
        React.createElement('label', null, 'Floorplans Webpage'),
        React.createElement('input', { name: 'floorplans', value: form.floorplans, onChange: handleFormChange, style: { width: '100%' } })
      ),
      React.createElement('button', { type: 'submit', style: { background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', minWidth: 120 } }, 'Add'),
      msg && React.createElement('div', { style: { color: '#388e3c', fontWeight: 600, marginLeft: 12 } }, msg)
    ),
    allowedProperties.length === 0 ?
      React.createElement('div', { style: { color: '#888', fontSize: 16 } }, 'No properties assigned.') :
      allowedProperties.map(property =>
        React.createElement('div', { key: property, style: { marginBottom: 36, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', padding: 24 } },
          React.createElement('h2', { style: { color: '#1976d2', marginBottom: 12 } }, property),
          (!compsData[property] || compsData[property].length === 0) ?
            React.createElement('div', { style: { color: '#888', fontSize: 15 } }, 'No competitors yet.') :
            React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', fontSize: 15, marginBottom: 8 } },
              React.createElement('thead', null,
                React.createElement('tr', { style: { background: '#f4f6fa' } },
                  React.createElement('th', { style: { padding: 10 } }, 'Name'),
                  React.createElement('th', { style: { padding: 10 } }, 'Year Built'),
                  React.createElement('th', { style: { padding: 10 } }, 'Distance (mi)'),
                  React.createElement('th', { style: { padding: 10 } }, 'Website'),
                  React.createElement('th', { style: { padding: 10 } }, 'Floorplans'),
                  React.createElement('th', { style: { padding: 10 } }, 'Specials/Pricing'),
                  React.createElement('th', { style: { padding: 10 } }, 'Last Scraped'),
                  React.createElement('th', { style: { padding: 10 } }, 'Actions')
                )
              ),
              React.createElement('tbody', null,
                compsData[property].map((comp, idx) =>
                  React.createElement('tr', { key: idx },
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee' } }, comp.name),
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee' } }, comp.yearBuilt),
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee' } }, comp.distance),
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee' } }, comp.website ? React.createElement('a', { href: comp.website, target: '_blank', rel: 'noopener noreferrer' }, 'Website') : ''),
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee' } },
                      comp.floorplanData && comp.floorplanData.length > 0
                        ? comp.floorplanData.map(fp => `${fp.name}: ${fp.price}`).join(', ')
                        : (comp.floorplans ? React.createElement('a', { href: comp.floorplans, target: '_blank', rel: 'noopener noreferrer' }, 'Floorplans') : '')
                    ),
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee', color: '#1976d2', whiteSpace: 'pre-line' } },
                      typeof comp.specials === 'string' ? comp.specials : (Array.isArray(comp.specials) ? comp.specials.join(' | ') : '')
                    ),
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee', fontSize: 13, color: '#888' } }, comp.lastScraped),
                    React.createElement('td', { style: { padding: 8, borderBottom: '1px solid #eee' } },
                      React.createElement('button', { onClick: () => handleScrape(property, idx), style: { background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', fontWeight: 500, cursor: 'pointer', marginRight: 6 } }, 'Scrape'),
                      React.createElement('button', { onClick: () => handleDeleteComp(property, idx), style: { background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', fontWeight: 500, cursor: 'pointer' } }, 'Delete')
                    )
                  )
                )
              )
            )
        )
      )
  );
}

// Admin panel for user management
function AdminSettingsPanel({ currentUser }) {
  const [users, setUsers] = React.useState(() => JSON.parse(window.localStorage.getItem('users') || '{}'));
  const [form, setForm] = React.useState({ username: '', password: '', role: 'CM', properties: [] });
  const [editUser, setEditUser] = React.useState(null);
  const [editProps, setEditProps] = React.useState([]);
  const [editRole, setEditRole] = React.useState('CM');
  const [resetPwUser, setResetPwUser] = React.useState('');
  const [resetPw, setResetPw] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [tab, setTab] = React.useState('manage');

  // Create user
  function handleCreateUser(e) {
    e.preventDefault();
    if (!form.username || !form.password) return setMessage('Username and password required');
    if (users[form.username]) return setMessage('User already exists');
    const newUsers = { ...users };
    newUsers[form.username] = {
      password: form.password,
      role: form.role,
      properties: form.role === 'Admin' ? allProperties : (form.properties.length ? form.properties : [allProperties[0]])
    };
    setUsers(newUsers);
    window.localStorage.setItem('users', JSON.stringify(newUsers));
    setForm({ username: '', password: '', role: 'CM', properties: [] });
    setMessage('User created');
  }

  // Edit user properties/role
  function handleEditUser(username) {
    setEditUser(username);
    setEditProps(users[username].properties || []);
    setEditRole(users[username].role);
    setMessage('');
  }
  function handleSaveEditUser() {
    const newUsers = { ...users };
    newUsers[editUser].properties = editRole === 'Admin' ? allProperties : editProps;
    newUsers[editUser].role = editRole;
    setUsers(newUsers);
    window.localStorage.setItem('users', JSON.stringify(newUsers));
    setEditUser(null);
    setMessage('User updated');
  }

  // Reset password
  function handleResetPassword() {
    if (!resetPwUser || !resetPw) return setMessage('Select user and enter new password');
    const newUsers = { ...users };
    newUsers[resetPwUser].password = resetPw;
    setUsers(newUsers);
    window.localStorage.setItem('users', JSON.stringify(newUsers));
    setResetPwUser('');
    setResetPw('');
    setMessage('Password reset');
  }

  // Assign properties to cell team (role === 'Cell Team')
  function handleAssignCellTeamProps(username, props) {
    const newUsers = { ...users };
    newUsers[username].properties = props;
    setUsers(newUsers);
    window.localStorage.setItem('users', JSON.stringify(newUsers));
    setMessage('Cell Team properties updated');
  }

  // Stylized tab buttons
  const tabBtn = isActive => ({
    padding: '10px 28px',
    border: 'none',
    borderBottom: isActive ? '3px solid #1976d2' : '3px solid transparent',
    background: 'none',
    fontWeight: 600,
    fontSize: 17,
    color: isActive ? '#1976d2' : '#222e3c',
    cursor: 'pointer',
    outline: 'none',
    marginRight: 16,
    marginBottom: -2
  });

  // All users table for the "All Users" tab
  function renderAllUsersTable() {
    return React.createElement('div', { style: { marginTop: 24 } },
      React.createElement('h3', { style: { marginBottom: 16 } }, 'All Users'),
      React.createElement('table', { style: { width: '100%', background: '#fafbfc', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', borderCollapse: 'collapse', fontSize: 15 } },
        React.createElement('thead', null,
          React.createElement('tr', { style: { background: '#f4f6fa' } },
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Username'),
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Role'),
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Properties')
          )
        ),
        React.createElement('tbody', null,
          Object.keys(users).map(username =>
            React.createElement('tr', { key: username, style: { borderBottom: '1px solid #eee' } },
              React.createElement('td', { style: { padding: 10 } }, username),
              React.createElement('td', { style: { padding: 10 } }, users[username].role),
              React.createElement('td', { style: { padding: 10 } }, (users[username].properties || []).join(', '))
            )
          )
        )
      )
    );
  }

  // User management tab
  function renderUserManagement() {
    return React.createElement('div', null,
      message && React.createElement('div', { style: { color: '#388e3c', marginBottom: 10, fontWeight: 600 } }, message),
      // Create user form
      React.createElement('form', { onSubmit: handleCreateUser, style: { marginBottom: 32, background: '#f7fafd', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' } },
        React.createElement('h3', { style: { marginTop: 0, marginBottom: 18, color: '#1976d2' } }, 'Create New User'),
        React.createElement('div', { style: { display: 'flex', gap: 12, marginBottom: 16 } },
          React.createElement('input', {
            placeholder: 'Username',
            value: form.username,
            onChange: e => setForm(f => ({ ...f, username: e.target.value })),
            style: { flex: 1, padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
          }),
          React.createElement('input', {
            placeholder: 'Password',
            type: 'password',
            value: form.password,
            onChange: e => setForm(f => ({ ...f, password: e.target.value })),
            style: { flex: 1, padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
          }),
          React.createElement('select', {
            value: form.role,
            onChange: e => setForm(f => ({ ...f, role: e.target.value, properties: [] })),
            style: { flex: 1, padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
          },
            React.createElement('option', { value: 'Admin' }, 'Admin'),
            React.createElement('option', { value: 'Cell Team' }, 'Cell Team'),
            React.createElement('option', { value: 'CM' }, 'Community Manager (CM)')
          )
        ),
        (form.role !== 'Admin') && React.createElement('div', { style: { marginBottom: 10, display: 'flex', flexWrap: 'wrap', gap: 8 } },
          allProperties.map(prop =>
            React.createElement('label', { key: prop, style: { display: 'inline-flex', alignItems: 'center', fontSize: 14, background: '#e3eafc', borderRadius: 4, padding: '2px 8px' } },
              React.createElement('input', {
                type: 'checkbox',
                checked: form.properties.includes(prop),
                onChange: e => {
                  if (e.target.checked) setForm(f => ({ ...f, properties: [...f.properties, prop] }));
                  else setForm(f => ({ ...f, properties: f.properties.filter(p => p !== prop) }));
                },
                style: { marginRight: 4 }
              }),
              prop
            )
          )
        ),
        React.createElement('button', { type: 'submit', style: { background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 } }, 'Create User')
      ),
      // User list and edit
      React.createElement('h3', { style: { marginTop: 32, marginBottom: 12, color: '#1976d2' } }, 'Manage Users'),
      React.createElement('table', { style: { width: '100%', marginBottom: 24, background: '#fafbfc', borderRadius: 8, boxShadow: '0 1px 4px rgba(0,0,0,0.04)', borderCollapse: 'collapse', fontSize: 15 } },
        React.createElement('thead', null,
          React.createElement('tr', { style: { background: '#f4f6fa' } },
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Username'),
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Role'),
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Properties'),
            React.createElement('th', { style: { padding: 12, textAlign: 'left' } }, 'Actions')
          )
        ),
        React.createElement('tbody', null,
          Object.keys(users).map(username =>
            React.createElement('tr', { key: username, style: { borderBottom: '1px solid #eee' } },
              React.createElement('td', { style: { padding: 10 } }, username),
              React.createElement('td', { style: { padding: 10 } }, users[username].role),
              React.createElement('td', { style: { padding: 10 } }, (users[username].properties || []).join(', ')),
              React.createElement('td', { style: { padding: 10 } },
                React.createElement('button', { onClick: () => handleEditUser(username), style: { marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 500, cursor: 'pointer' } }, 'Edit'),
                users[username].role === 'Cell Team' && React.createElement('button', {
                  onClick: () => handleAssignCellTeamProps(username, allProperties),
                  style: { marginRight: 8, background: '#388e3c', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 16px', fontWeight: 500, cursor: 'pointer' }
                }, 'Assign All Properties')
              )
            )
          )
        )
      ),
      // Edit user modal
      editUser && React.createElement('div', {
        style: { position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
        onClick: () => setEditUser(null)
      },
        React.createElement('div', {
          style: { background: '#fff', borderRadius: 16, padding: 32, minWidth: 350, maxWidth: 500, width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.13)', position: 'relative' },
          onClick: e => e.stopPropagation()
        },
          React.createElement('h3', null, `Edit User: ${editUser}`),
          React.createElement('label', null, 'Role: '),
          React.createElement('select', {
            value: editRole,
            onChange: e => setEditRole(e.target.value),
            style: { marginLeft: 8, marginBottom: 12, padding: 8, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
          },
            React.createElement('option', { value: 'Admin' }, 'Admin'),
            React.createElement('option', { value: 'Cell Team' }, 'Cell Team'),
            React.createElement('option', { value: 'CM' }, 'Community Manager (CM)')
          ),
          editRole !== 'Admin' && React.createElement('div', { style: { margin: '12px 0', display: 'flex', flexWrap: 'wrap', gap: 8 } },
            allProperties.map(prop =>
              React.createElement('label', { key: prop, style: { display: 'inline-flex', alignItems: 'center', fontSize: 14, background: '#e3eafc', borderRadius: 4, padding: '2px 8px' } },
                React.createElement('input', {
                  type: 'checkbox',
                  checked: editProps.includes(prop),
                  onChange: e => {
                    if (e.target.checked) setEditProps(p => [...p, prop]);
                    else setEditProps(p => p.filter(x => x !== prop));
                  },
                  style: { marginRight: 4 }
                }),
                prop
              )
            )
          ),
          React.createElement('div', { style: { marginTop: 16 } },
            React.createElement('button', { onClick: handleSaveEditUser, style: { marginRight: 8, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 22px', fontWeight: 600, fontSize: 15, cursor: 'pointer' } }, 'Save'),
            React.createElement('button', { onClick: () => setEditUser(null), style: { background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 22px', fontWeight: 600, fontSize: 15, cursor: 'pointer' } }, 'Cancel')
          )
        )
      ),
      // Reset password
      React.createElement('div', { style: { marginTop: 32, background: '#f7fafd', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' } },
        React.createElement('h3', { style: { marginTop: 0, marginBottom: 18, color: '#1976d2' } }, 'Reset User Password'),
        React.createElement('div', { style: { display: 'flex', gap: 12, alignItems: 'center' } },
          React.createElement('select', {
            value: resetPwUser,
            onChange: e => setResetPwUser(e.target.value),
            style: { flex: 2, padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
          },
            React.createElement('option', { value: '' }, 'Select user'),
            Object.keys(users).map(u => React.createElement('option', { key: u, value: u }, u))
          ),
          React.createElement('input', {
            placeholder: 'New password',
            type: 'password',
            value: resetPw,
            onChange: e => setResetPw(e.target.value),
            style: { flex: 2, padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
          }),
          React.createElement('button', { onClick: handleResetPassword, style: { background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer' } }, 'Reset Password')
        )
      )
    );
  }

  return React.createElement('div', { style: { marginTop: 32, background: '#fff', borderRadius: 10, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' } },
    React.createElement('div', { style: { display: 'flex', borderBottom: '1px solid #e0e6ef', marginBottom: 24 } },
      React.createElement('button', { style: tabBtn(tab === 'manage'), onClick: () => setTab('manage') }, 'User Management'),
      React.createElement('button', { style: tabBtn(tab === 'all'), onClick: () => setTab('all') }, 'All Users')
    ),
    tab === 'manage' ? renderUserManagement() : renderAllUsersTable()
  );
}

export default function App() {
  const [user, setUser] = React.useState(() => window.localStorage.getItem('currentUser') || null);
  const [authMode, setAuthMode] = React.useState('login');
  const [authForm, setAuthForm] = React.useState({ username: '', password: '' });
  const [authError, setAuthError] = React.useState('');
  const [registerRole, setRegisterRole] = React.useState('CM');
  const [registerProperties, setRegisterProperties] = React.useState([]);
  const [activeTab, setActiveTab] = React.useState('Marketing Calendar');
  // FIX: Move settingsTab state to top-level App component
  const [settingsTab, setSettingsTab] = React.useState('profile');

  React.useEffect(() => {
    const users = JSON.parse(window.localStorage.getItem('users') || '{}');
    if (!users['CMP']) {
      users['CMP'] = { password: 'PSM2025', role: 'Admin', properties: allProperties };
      window.localStorage.setItem('users', JSON.stringify(users));
    }
    const currentUser = window.localStorage.getItem('currentUser');
    if (currentUser && users[currentUser] && users[currentUser].role === 'Admin') {
      users[currentUser].properties = allProperties;
      window.localStorage.setItem('users', JSON.stringify(users));
    }
  }, [user]);

  function handleAuthChange(e) {
    const { name, value } = e.target;
    setAuthForm(f => ({ ...f, [name]: value }));
  }
  function handleLogin(e) {
    e.preventDefault();
    const users = JSON.parse(window.localStorage.getItem('users') || '{}');
    if (users[authForm.username] && users[authForm.username].password === authForm.password) {
      if (users[authForm.username].role === 'Admin') {
        users[authForm.username].properties = allProperties;
        window.localStorage.setItem('users', JSON.stringify(users));
      }
      setUser(authForm.username);
      window.localStorage.setItem('currentUser', authForm.username);
      setAuthError('');
      setAuthForm({ username: '', password: '' });
    } else {
      setAuthError('Invalid username or password');
    }
  }
  function handleRegister(e) {
    e.preventDefault();
    const users = JSON.parse(window.localStorage.getItem('users') || '{}');
    if (users[authForm.username]) {
      setAuthError('Username already exists');
      return;
    }
    const role = registerRole || 'CM';
    let properties = [];
    if (role === 'Admin') {
      properties = allProperties;
    } else if (role === 'Cell Team') {
      properties = allProperties.slice(0, 3);
    } else {
      properties = registerProperties && registerProperties.length > 0 ? registerProperties : [allProperties[0]];
    }
    users[authForm.username] = { password: authForm.password, role, properties };
    window.localStorage.setItem('users', JSON.stringify(users));
    setUser(authForm.username);
    window.localStorage.setItem('currentUser', authForm.username);
    setAuthError('');
    setAuthForm({ username: '', password: '' });
  }
  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem('currentUser');
  }

  const mainStyle = {
    marginLeft: 220,
    padding: 40,
    minHeight: '100vh',
    background: '#f4f6fa',
    fontFamily: 'Arial, sans-serif',
  };

  function renderMain() {
    if (activeTab === 'Marketing Calendar') {
      return React.createElement(MarketingCalendar, {});
    } else if (activeTab === 'Dashboard') {
      return React.createElement(Dashboard, {});
    } else if (activeTab === 'Market Insight') {
      return React.createElement(MarketInsight, {});
    } else if (activeTab === 'Campaign Manager') {
      return React.createElement('div', null, 'Campaign Manager is viewable.');
    } else if (activeTab === 'Social Media Audit') {
      return React.createElement('div', null, 'Social Media Audit is viewable.');
    } else if (activeTab === 'Tools') {
      return React.createElement('div', null,
        React.createElement('h1', null, 'Tools'),
        React.createElement('p', null, 'Here you will find various marketing tools.')
      );
    } else if (activeTab === 'Settings') {
      // Settings tabs: Profile (all users), Admin panel (admins only)
      const currentUser = window.localStorage.getItem('currentUser');
      const users = JSON.parse(window.localStorage.getItem('users') || '{}');
      const isAdmin = users[currentUser] && users[currentUser].role === 'Admin';
      // settingsTab and setSettingsTab are now from App state

      // ProfileSettingsPanel as a real component
      function ProfileSettingsPanel({ currentUser, users }) {
        const [profile, setProfile] = React.useState(() => {
          const u = users[currentUser] || {};
          return {
            name: u.name || '',
            email: u.email || '',
            position: u.position || '',
            profilePic: u.profilePic || '',
            password: '',
            newPassword: '',
            confirmNewPassword: ''
          };
        });
        const [msg, setMsg] = React.useState('');
        // Handle profile pic upload
        function handlePic(e) {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new window.FileReader();
          reader.onload = function(evt) {
            setProfile(p => ({ ...p, profilePic: evt.target.result }));
          };
          reader.readAsDataURL(file);
        }
        // Save profile
        function handleSaveProfile(e) {
          e.preventDefault();
          const newUsers = { ...users };
          newUsers[currentUser] = {
            ...newUsers[currentUser],
            name: profile.name,
            email: profile.email,
            position: profile.position,
            profilePic: profile.profilePic
          };
          window.localStorage.setItem('users', JSON.stringify(newUsers));
          setMsg('Profile updated');
        }
        // Change password
        function handleChangePassword(e) {
          e.preventDefault();
          if (!profile.password || !profile.newPassword || !profile.confirmNewPassword) {
            setMsg('Fill all password fields');
            return;
          }
          if (profile.newPassword !== profile.confirmNewPassword) {
            setMsg('New passwords do not match');
            return;
          }
          if (users[currentUser].password !== profile.password) {
            setMsg('Current password is incorrect');
            return;
          }
          const newUsers = { ...users };
          newUsers[currentUser].password = profile.newPassword;
          window.localStorage.setItem('users', JSON.stringify(newUsers));
          setProfile(p => ({ ...p, password: '', newPassword: '', confirmNewPassword: '' }));
          setMsg('Password changed');
        }
        return React.createElement('div', { style: { maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 10, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.07)' } },
          React.createElement('h2', { style: { marginBottom: 24, color: '#1976d2' } }, 'Edit Profile'),
          msg && React.createElement('div', { style: { color: '#388e3c', marginBottom: 12, fontWeight: 600 } }, msg),
          React.createElement('form', { onSubmit: handleSaveProfile },
            React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginBottom: 18 } },
              React.createElement('label', { htmlFor: 'profilePic', style: { marginRight: 18, cursor: 'pointer' } },
                React.createElement('img', {
                  src: profile.profilePic || './images/default-profile.png',
                  alt: 'Profile',
                  style: { width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', border: '2px solid #e0e6ef' }
                }),
                React.createElement('input', {
                  id: 'profilePic',
                  type: 'file',
                  accept: 'image/*',
                  style: { display: 'none' },
                  onChange: handlePic
                })
              ),
              React.createElement('div', null,
                React.createElement('div', { style: { fontWeight: 600, fontSize: 18 } }, users[currentUser].username || currentUser),
                React.createElement('div', { style: { color: '#888', fontSize: 14 } }, users[currentUser].role)
              )
            ),
            React.createElement('div', { style: { marginBottom: 14 } },
              React.createElement('label', null, 'Name'),
              React.createElement('input', {
                value: profile.name,
                onChange: e => setProfile(p => ({ ...p, name: e.target.value })),
                style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
              })
            ),
            React.createElement('div', { style: { marginBottom: 14 } },
              React.createElement('label', null, 'Email'),
              React.createElement('input', {
                value: profile.email,
                onChange: e => setProfile(p => ({ ...p, email: e.target.value })),
                style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
              })
            ),
            React.createElement('div', { style: { marginBottom: 18 } },
              React.createElement('label', null, 'Position'),
              React.createElement('input', {
                value: profile.position,
                onChange: e => setProfile(p => ({ ...p, position: e.target.value })),
                style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
              })
            ),
            React.createElement('button', { type: 'submit', style: { background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 } }, 'Save Profile')
          ),
          React.createElement('form', { onSubmit: handleChangePassword, style: { marginTop: 32, background: '#f7fafd', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.04)' } },
            React.createElement('h3', { style: { marginTop: 0, marginBottom: 18, color: '#1976d2' } }, 'Change Password'),
            React.createElement('div', { style: { marginBottom: 12 } },
              React.createElement('input', {
                type: 'password',
                placeholder: 'Current password',
                value: profile.password,
                onChange: e => setProfile(p => ({ ...p, password: e.target.value })),
                style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
              })
            ),
            React.createElement('div', { style: { marginBottom: 12 } },
              React.createElement('input', {
                type: 'password',
                placeholder: 'New password',
                value: profile.newPassword,
                onChange: e => setProfile(p => ({ ...p, newPassword: e.target.value })),
                style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
              })
            ),
            React.createElement('div', { style: { marginBottom: 12 } },
              React.createElement('input', {
                type: 'password',
                placeholder: 'Confirm new password',
                value: profile.confirmNewPassword,
                onChange: e => setProfile(p => ({ ...p, confirmNewPassword: e.target.value })),
                style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #bbb', fontSize: 15 }
              })
            ),
            React.createElement('button', { type: 'submit', style: { background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 28px', fontWeight: 600, fontSize: 16, cursor: 'pointer', marginTop: 8 } }, 'Change Password')
          )
        );
      }

      return React.createElement('div', null,
        React.createElement('h1', null, 'Settings'),
        React.createElement('div', { style: { display: 'flex', borderBottom: '1px solid #e0e6ef', marginBottom: 24, marginTop: 16 } },
          React.createElement('button', {
            style: {
              padding: '10px 28px', border: 'none', borderBottom: settingsTab === 'profile' ? '3px solid #1976d2' : '3px solid transparent', background: 'none', fontWeight: 600, fontSize: 17, color: settingsTab === 'profile' ? '#1976d2' : '#222e3c', cursor: 'pointer', outline: 'none', marginRight: 16, marginBottom: -2
            },
            onClick: () => setSettingsTab('profile')
          }, 'Profile'),
          isAdmin && React.createElement('button', {
            style: {
              padding: '10px 28px', border: 'none', borderBottom: settingsTab === 'admin' ? '3px solid #1976d2' : '3px solid transparent', background: 'none', fontWeight: 600, fontSize: 17, color: settingsTab === 'admin' ? '#1976d2' : '#222e3c', cursor: 'pointer', outline: 'none', marginRight: 16, marginBottom: -2
            },
            onClick: () => setSettingsTab('admin')
          }, 'Admin')
        ),
        settingsTab === 'profile' && React.createElement(ProfileSettingsPanel, { currentUser, users }),
        settingsTab === 'admin' && isAdmin && React.createElement(AdminSettingsPanel, { currentUser })
      );
    }
    return React.createElement('div', null, 'No content for this tab.');
  }

  if (!user) {
    return React.createElement('div', {
      style: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f4f6fa' }
    },
      React.createElement('div', {
        style: { background: '#fff', padding: 32, borderRadius: 10, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', minWidth: 320 }
      },
        React.createElement('img', {
          src: './images/capstone-logo.png',
          alt: 'Company Logo',
          style: { width: 90, display: 'block', margin: '0 auto 18px', borderRadius: 6, background: '#fff', padding: 4 }
        }),
        React.createElement('h2', { style: { textAlign: 'center', marginBottom: 18 } }, authMode === 'login' ? 'Login' : 'Register'),
        authError && React.createElement('div', { style: { color: '#f44336', marginBottom: 10, textAlign: 'center' } }, authError),
        React.createElement('form', { onSubmit: authMode === 'login' ? handleLogin : handleRegister },
          React.createElement('div', { style: { marginBottom: 14 } },
            React.createElement('input', {
              name: 'username',
              value: authForm.username,
              onChange: handleAuthChange,
              placeholder: 'Username',
              style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }
            })
          ),
          React.createElement('div', { style: { marginBottom: 18 } },
            React.createElement('input', {
              name: 'password',
              type: 'password',
              value: authForm.password,
              onChange: handleAuthChange,
              placeholder: 'Password',
              style: { width: '100%', padding: 10, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }
            })
          ),
          authMode === 'register' && React.createElement('div', { style: { marginBottom: 18 } },
            React.createElement('label', { style: { display: 'block', marginBottom: 4, fontWeight: 500 } }, 'Role'),
            React.createElement('select', {
              value: registerRole,
              onChange: e => setRegisterRole(e.target.value),
              style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }
            },
              React.createElement('option', { value: 'Admin' }, 'Admin'),
              React.createElement('option', { value: 'Cell Team' }, 'Cell Team'),
              React.createElement('option', { value: 'CM' }, 'Community Manager (CM)')
            )
          ),
          authMode === 'register' && registerRole === 'CM' && React.createElement('div', { style: { marginBottom: 18 } },
            React.createElement('label', { style: { display: 'block', marginBottom: 4, fontWeight: 500 } }, 'Properties'),
            allProperties.map(prop =>
              React.createElement('label', { key: prop, style: { display: 'inline-flex', alignItems: 'center', marginRight: 10 } },
                React.createElement('input', {
                  type: 'checkbox',
                  checked: registerProperties.includes(prop),
                  onChange: e => {
                    if (e.target.checked) {
                      setRegisterProperties([...registerProperties, prop]);
                    } else {
                      setRegisterProperties(registerProperties.filter(p => p !== prop));
                    }
                  },
                  style: { marginRight: 4 }
                }),
                prop
              )
            )
          ),
          React.createElement('button', {
            type: 'submit',
            style: { width: '100%', background: '#30405a', color: '#fff', padding: '10px 0', border: 'none', borderRadius: 4, fontWeight: 600, fontSize: 16, cursor: 'pointer' }
          }, authMode === 'login' ? 'Login' : 'Register')
        ),
        React.createElement('div', { style: { marginTop: 16, textAlign: 'center' } },
          authMode === 'login'
            ? React.createElement('span', null, "Don't have an account? ", React.createElement('a', { href: '#', style: { color: '#30405a', cursor: 'pointer' }, onClick: () => { setAuthMode('register'); setAuthError(''); } }, 'Register'))
            : React.createElement('span', null, 'Already have an account? ', React.createElement('a', { href: '#', style: { color: '#30405a', cursor: 'pointer' }, onClick: () => { setAuthMode('login'); setAuthError(''); } }, 'Login'))
        )
      )
    );
  }

  return React.createElement('div', null,
    React.createElement(NavBar, {
      activeTab,
      onTabChange: setActiveTab,
      user,
      onLogout: handleLogout
    }),
    React.createElement('main', { style: mainStyle },
      renderMain()
    )
  );
}
