export default function App() {
  // --- Auth State ---
  // Ensure default admin exists
  React.useEffect(() => {
    const users = JSON.parse(window.localStorage.getItem('users') || '{}');
    if (!users['CMP']) {
      users['CMP'] = { password: 'PSM2025' };
      window.localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const [user, setUser] = React.useState(() => {
    return window.localStorage.getItem('currentUser') || null;
  });
  const [authMode, setAuthMode] = React.useState('login'); // or 'register'
  const [authForm, setAuthForm] = React.useState({ username: '', password: '' });
  const [authError, setAuthError] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('Dashboard');

  // --- Auth Logic ---
  function handleAuthChange(e) {
    const { name, value } = e.target;
    setAuthForm(f => ({ ...f, [name]: value }));
  }

  function handleLogin(e) {
    e.preventDefault();
    const users = JSON.parse(window.localStorage.getItem('users') || '{}');
    if (users[authForm.username] && users[authForm.username].password === authForm.password) {
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
    users[authForm.username] = { password: authForm.password };
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

  // --- UI Layout ---
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
  const navLinkActive = {
    background: '#30405a',
  };
  const navLinkHover = {
    background: '#30405a',
  };
  const mainStyle = {
    marginLeft: 220,
    padding: 40,
    minHeight: '100vh',
    background: '#f4f6fa',
    fontFamily: 'Arial, sans-serif',
  };

  // Simple hover effect using JS (since no CSS file)
  function handleMouseOver(e) {
    Object.assign(e.target.style, navLinkHover);
  }
  function handleMouseOut(e) {
    if (e.target.dataset.active !== 'true') {
      Object.keys(navLinkHover).forEach(k => {
        e.target.style[k] = '';
      });
    }
  }

  function handleNavClick(tab) {
    setActiveTab(tab);
  }

  function renderMain() {
    if (activeTab === 'Dashboard') {
      return (
        React.createElement(React.Fragment, null,
          React.createElement('h1', null, 'Marketing Multi-Tool Platform'),
          React.createElement('p', null, 'Welcome to your marketing multi-tool platform! Choose a tool from the navigation.')
        )
      );
    } else if (activeTab === 'Tools') {
      return (
        React.createElement(React.Fragment, null,
          React.createElement('h1', null, 'Tools'),
          React.createElement('p', null, 'Here you will find various marketing tools.')
        )
      );
    } else if (activeTab === 'Settings') {
      return (
        React.createElement(React.Fragment, null,
          React.createElement('h1', null, 'Settings'),
          React.createElement('p', null, 'Configure your platform settings here.')
        )
      );
    } else if (activeTab === 'Campaign Manager') {
      // Campaign Manager logic
      return React.createElement(CampaignManager, null);
    }
    return null;
  }

  // --- CampaignManager component ---
  function CampaignManager() {
    // Store campaigns per user
    const campaignsKey = user ? `campaigns_${user}` : 'campaigns';
    const [campaigns, setCampaigns] = React.useState(() => {
      const saved = window.localStorage.getItem(campaignsKey);
      return saved ? JSON.parse(saved) : [];
    });
    const [form, setForm] = React.useState({
      name: '',
      type: 'Event',
      color: 'yellow',
      description: '',
      date: '',
      planning: '',
      purpose: '',
      budget: '',
      timeline: '',
      materials: '',
      location: '',
      kpis: '',
      photos: [],
      status: 'draft',
      id: null
    });
    const [editingId, setEditingId] = React.useState(null);
    const [viewingCampaign, setViewingCampaign] = React.useState(null);
    const [calendarView, setCalendarView] = React.useState('month'); // 'week', 'month', 'year', 'all'
    const [typeFilter, setTypeFilter] = React.useState('all');
    const [sortBy, setSortBy] = React.useState('date'); // 'date' or 'name'

    React.useEffect(() => {
      window.localStorage.setItem(campaignsKey, JSON.stringify(campaigns));
    }, [campaigns, campaignsKey]);

    function handleChange(e) {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: value }));
    }

    function handleSaveDraft(e) {
      e.preventDefault();
      if (!form.name.trim()) return;
      const draft = { ...form, status: 'draft' };
      if (editingId !== null) {
        setCampaigns(campaigns.map(c => c.id === editingId ? { ...draft, id: editingId } : c));
        setEditingId(null);
      } else {
        setCampaigns([
          ...campaigns,
          { ...draft, id: Date.now() }
        ]);
      }
      resetForm();
    }

    function handleSubmit(e) {
      e.preventDefault();
      if (!form.name.trim()) return;
      const submitted = { ...form, status: 'submitted' };
      if (editingId !== null) {
        setCampaigns(campaigns.map(c => c.id === editingId ? { ...submitted, id: editingId } : c));
        setEditingId(null);
      } else {
        setCampaigns([
          ...campaigns,
          { ...submitted, id: Date.now() }
        ]);
      }
      // Download event details
      downloadEventDetails(submitted);
      // Open mailto link
      window.location.href = generateMailto(submitted);
      resetForm();
    }

    function resetForm() {
      setForm({
        name: '',
        type: 'Event',
        description: '',
        date: '',
        planning: '',
        purpose: '',
        budget: '',
        timeline: '',
        materials: '',
        location: '',
        kpis: '',
        photos: [],
        status: 'draft',
        id: null
      });
    }

    function downloadEventDetails(campaign) {
      const details = [
        `Name: ${campaign.name}`,
        `Type: ${campaign.type}`,
        `Date: ${campaign.date}`,
        `Planning: ${campaign.planning}`,
        `Purpose: ${campaign.purpose}`,
        `Budget: ${campaign.budget}`,
        `Timeline: ${campaign.timeline}`,
        `Materials: ${campaign.materials}`,
        `Location: ${campaign.location}`,
        `KPIs: ${campaign.kpis}`,
        `Description: ${campaign.description}`,
        `Status: ${campaign.status}`
      ].join('\n');
      const blob = new Blob([details], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${campaign.name.replace(/\s+/g, '_') || 'event'}_details.txt`;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }

    function generateMailto(campaign) {
      const subject = encodeURIComponent(`New Marketing Event: ${campaign.name}`);
      const body = encodeURIComponent(
        `Name: ${campaign.name}\nType: ${campaign.type}\nDate: ${campaign.date}\nPlanning: ${campaign.planning}\nPurpose: ${campaign.purpose}\nBudget: ${campaign.budget}\nTimeline: ${campaign.timeline}\nMaterials: ${campaign.materials}\nLocation: ${campaign.location}\nKPIs: ${campaign.kpis}\nDescription: ${campaign.description}`
      );
      return `mailto:?subject=${subject}&body=${body}`;
    }

    function handleEdit(id) {
      const c = campaigns.find(c => c.id === id);
      setForm({
        name: c.name || '',
        type: c.type || 'Event',
        description: c.description || '',
        date: c.date || '',
        planning: c.planning || '',
        purpose: c.purpose || '',
        budget: c.budget || '',
        timeline: c.timeline || '',
        materials: c.materials || '',
        location: c.location || '',
        kpis: c.kpis || '',
        photos: c.photos || [],
        id: c.id
      });
      setEditingId(id);
    }

    function handleDelete(id) {
      setCampaigns(campaigns.filter(c => c.id !== id));
      if (editingId === id) {
        setForm({
          name: '',
          type: 'Event',
          description: '',
          date: '',
          planning: '',
          purpose: '',
          budget: '',
          timeline: '',
          materials: '',
          location: '',
          kpis: '',
          photos: [],
          id: null
        });
        setEditingId(null);
      }
    }

    // Handle marketing photo uploads
    function handlePhotoUpload(e) {
      const files = Array.from(e.target.files);
      const readers = files.map(file => {
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.onload = ev => resolve(ev.target.result);
          reader.readAsDataURL(file);
        });
      });
      Promise.all(readers).then(images => {
        setForm(f => ({ ...f, photos: [...(f.photos || []), ...images] }));
      });
    }

    return React.createElement('div', null,
      React.createElement('h1', null, 'Campaign Manager'),
      React.createElement('form', { onSubmit: handleSubmit, style: { marginBottom: 32, background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', maxWidth: 480 } },
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Name'),
          React.createElement('input', {
            name: 'name',
            value: form.name,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' },
            required: true
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Event Type & Color'),
          React.createElement('select', {
            name: 'color',
            value: form.color,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', marginBottom: 6 }
          },
            React.createElement('option', { value: 'yellow' }, 'Resident Event (Yellow)'),
            React.createElement('option', { value: 'green' }, 'Off-Site Tabling (Green)'),
            React.createElement('option', { value: 'blue' }, 'Housing Fair/University Event (Blue)'),
            React.createElement('option', { value: 'purple' }, 'Social Media Post (Purple)'),
            React.createElement('option', { value: 'red' }, 'Leasing Deadline (Red)')
          ),
          React.createElement('input', {
            type: 'hidden',
            name: 'type',
            value: form.type
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Date'),
          React.createElement('input', {
            name: 'date',
            type: 'date',
            value: form.date,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' },
            required: true
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Planning'),
          React.createElement('textarea', {
            name: 'planning',
            value: form.planning,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', minHeight: 40 }
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Purpose'),
          React.createElement('textarea', {
            name: 'purpose',
            value: form.purpose,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', minHeight: 40 }
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Budget'),
          React.createElement('input', {
            name: 'budget',
            value: form.budget,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' },
            placeholder: 'e.g. $5000'
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Timeline'),
          React.createElement('input', {
            name: 'timeline',
            value: form.timeline,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' },
            placeholder: 'e.g. Q2 2025'
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Materials Needed'),
          React.createElement('textarea', {
            name: 'materials',
            value: form.materials,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', minHeight: 40 }
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Location'),
          React.createElement('input', {
            name: 'location',
            value: form.location,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'KPIs'),
          React.createElement('textarea', {
            name: 'kpis',
            value: form.kpis,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', minHeight: 40 }
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Description'),
          React.createElement('textarea', {
            name: 'description',
            value: form.description,
            onChange: handleChange,
            style: { width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc', minHeight: 60 }
          })
        ),
        React.createElement('div', { style: { marginBottom: 16 } },
          React.createElement('label', { style: { display: 'block', marginBottom: 4 } }, 'Marketing Photos'),
          React.createElement('input', {
            type: 'file',
            accept: 'image/*',
            multiple: true,
            onChange: handlePhotoUpload,
            style: { display: 'block', marginBottom: 8 }
          }),
          form.photos && form.photos.length > 0 && React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8 } },
            form.photos.map((src, i) =>
              React.createElement('img', { key: i, src, alt: 'Preview', style: { width: 40, height: 40, objectFit: 'cover', borderRadius: 4, border: '1px solid #eee' } })
            )
          )
        ),
        React.createElement('div', { style: { display: 'flex', gap: 12 } },
          React.createElement('button', {
            type: 'button',
            onClick: handleSaveDraft,
            style: { background: '#e0e7ef', color: '#30405a', padding: '10px 24px', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }
          }, 'Save as Draft'),
          React.createElement('button', {
            type: 'submit',
            style: { background: '#30405a', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: 4, fontWeight: 600, cursor: 'pointer' }
          }, editingId !== null ? 'Update & Submit' : 'Submit')
        )
      ),
      React.createElement('div', null,
        React.createElement('h2', null, 'Marketing Calendar'),
        React.createElement('div', { style: { marginBottom: 16, display: 'flex', gap: 8, alignItems: 'center' } },
          ['week', 'month', 'year', 'all'].map(view =>
            React.createElement('button', {
              key: view,
              onClick: () => setCalendarView(view),
              style: {
                background: calendarView === view ? '#30405a' : '#e0e7ef',
                color: calendarView === view ? '#fff' : '#30405a',
                border: 'none', borderRadius: 4, padding: '6px 16px', cursor: 'pointer', fontWeight: 500
              }
            }, view.charAt(0).toUpperCase() + view.slice(1))
          ),
          React.createElement('span', { style: { marginLeft: 16, fontWeight: 500 } }, 'Type:'),
          React.createElement('select', {
            value: typeFilter,
            onChange: e => setTypeFilter(e.target.value),
            style: { padding: '6px 10px', borderRadius: 4, border: '1px solid #ccc', marginRight: 16 }
          },
            React.createElement('option', { value: 'all' }, 'All'),
            React.createElement('option', { value: 'yellow' }, 'Resident Event'),
            React.createElement('option', { value: 'green' }, 'Off-Site Tabling'),
            React.createElement('option', { value: 'blue' }, 'Housing Fair/University Event'),
            React.createElement('option', { value: 'purple' }, 'Social Media Post'),
            React.createElement('option', { value: 'red' }, 'Leasing Deadline')
          ),
          React.createElement('span', { style: { fontWeight: 500 } }, 'Sort by:'),
          React.createElement('select', {
            value: sortBy,
            onChange: e => setSortBy(e.target.value),
            style: { padding: '6px 10px', borderRadius: 4, border: '1px solid #ccc' }
          },
            React.createElement('option', { value: 'date' }, 'Date'),
            React.createElement('option', { value: 'name' }, 'Name')
          )
        ),
        React.createElement(Calendar, { campaigns, calendarView, typeFilter }),
        React.createElement('h2', { style: { marginTop: 40 } }, 'Your Campaigns & Events'),
        campaigns.length === 0 && React.createElement('p', null, 'No campaigns or events yet.'),
        React.createElement('ul', { style: { listStyle: 'none', padding: 0 } },
          campaigns
            .filter(c => typeFilter === 'all' ? true : c.color === typeFilter)
            .sort((a, b) => {
              if (sortBy === 'date') {
                return (a.date || '').localeCompare(b.date || '');
              } else {
                return (a.name || '').localeCompare(b.name || '');
              }
            })
            .map(c =>
              React.createElement('li', {
                key: c.id,
                style: { background: '#fff', marginBottom: 16, padding: 16, borderRadius: 6, boxShadow: '0 1px 4px rgba(0,0,0,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
                onClick: () => setViewingCampaign(c)
              },
                React.createElement('div', null,
                  React.createElement('div', { style: { fontWeight: 600, fontSize: 18 } }, c.name),
                  React.createElement('div', { style: { color: '#888', fontSize: 14, marginBottom: 4 } }, c.type + (c.date ? ' • ' + c.date : '')),
                  React.createElement('div', { style: { fontSize: 15 } }, c.description)
                ),
                React.createElement('div', {
                  onClick: e => e.stopPropagation()
                },
                  React.createElement('button', {
                    onClick: () => handleEdit(c.id),
                    style: { marginRight: 8, background: '#e0e7ef', color: '#30405a', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 500 }
                  }, 'Edit'),
                  React.createElement('button', {
                    onClick: () => handleDelete(c.id),
                    style: { background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '6px 14px', cursor: 'pointer', fontWeight: 500 }
                  }, 'Delete')
                )
              )
            )
        ),
        viewingCampaign && React.createElement(CampaignDetailModal, {
          campaign: viewingCampaign,
          onClose: () => setViewingCampaign(null),
          onEdit: () => { handleEdit(viewingCampaign.id); setViewingCampaign(null); }
        })
      )
    );
  }

  // --- Campaign Detail Modal ---
  function CampaignDetailModal({ campaign, onClose, onEdit }) {
    return React.createElement('div', {
      style: {
        position: 'fixed', left: 0, top: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }
    },
      React.createElement('div', {
        style: { background: '#fff', borderRadius: 10, padding: 32, minWidth: 350, maxWidth: 500, boxShadow: '0 2px 16px rgba(0,0,0,0.13)', position: 'relative' }
      },
        React.createElement('button', {
          onClick: onClose,
          style: { position: 'absolute', right: 16, top: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }
        }, '×'),
        React.createElement('h2', { style: { marginBottom: 10 } }, campaign.name),
        React.createElement('div', { style: { color: '#888', marginBottom: 10 } }, campaign.type + (campaign.date ? ' • ' + campaign.date : '')),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'Purpose: '), campaign.purpose),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'Planning: '), campaign.planning),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'Budget: '), campaign.budget),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'Timeline: '), campaign.timeline),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'Materials Needed: '), campaign.materials),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'Location: '), campaign.location),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'KPIs: '), campaign.kpis),
        React.createElement('div', { style: { marginBottom: 10 } }, React.createElement('b', null, 'Description: '), campaign.description),
        campaign.photos && campaign.photos.length > 0 && React.createElement('div', { style: { marginBottom: 10 } },
          React.createElement('b', null, 'Marketing Photos:'),
          React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 } },
            campaign.photos.map((src, i) =>
              React.createElement('img', { key: i, src, alt: 'Marketing', style: { width: 60, height: 60, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' } })
            )
          )
        ),
        React.createElement('div', { style: { marginTop: 18, textAlign: 'right' } },
          React.createElement('button', {
            onClick: onEdit,
            style: { background: '#30405a', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', cursor: 'pointer', fontWeight: 500, marginRight: 8 }
          }, 'Edit'),
          React.createElement('button', {
            onClick: onClose,
            style: { background: '#e0e7ef', color: '#30405a', border: 'none', borderRadius: 4, padding: '8px 18px', cursor: 'pointer', fontWeight: 500 }
          }, 'Close')
        )
      )
    );
  }

  // --- Calendar component ---
  function Calendar({ campaigns, calendarView }) {
    // Get current month/year
    const today = new Date();
    const [month, setMonth] = React.useState(today.getMonth());
    const [year, setYear] = React.useState(today.getFullYear());

    // Get all days in month
    function getDaysInMonth(year, month) {
      return new Date(year, month + 1, 0).getDate();
    }
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun

    // Filter campaigns by calendarView
    let filteredCampaigns = campaigns;
    if (calendarView === 'week') {
      // Get start/end of this week (Sunday-Saturday)
      const start = new Date(today);
      start.setDate(today.getDate() - today.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      filteredCampaigns = campaigns.filter(c => {
        if (!c.date) return false;
        const d = new Date(c.date);
        return d >= start && d <= end;
      });
    } else if (calendarView === 'month') {
      filteredCampaigns = campaigns.filter(c => {
        if (!c.date) return false;
        const d = new Date(c.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });
    } else if (calendarView === 'year') {
      filteredCampaigns = campaigns.filter(c => {
        if (!c.date) return false;
        const d = new Date(c.date);
        return d.getFullYear() === year;
      });
    } // 'all' shows all

    // Map campaigns by date
    const eventsByDate = {};
    filteredCampaigns.forEach(c => {
      if (c.date) {
        if (!eventsByDate[c.date]) eventsByDate[c.date] = [];
        eventsByDate[c.date].push(c);
      }
    });

    // Calendar grid
    const weeks = [];
    let day = 1 - firstDay;
    for (let w = 0; w < 6; w++) {
      const week = [];
      for (let d = 0; d < 7; d++, day++) {
        if (day < 1 || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day);
        }
      }
      weeks.push(week);
      if (day > daysInMonth) break;
    }

    // Month/year navigation
    function prevMonth() {
      if (month === 0) {
        setMonth(11); setYear(y => y - 1);
      } else {
        setMonth(m => m - 1);
      }
    }
    function nextMonth() {
      if (month === 11) {
        setMonth(0); setYear(y => y + 1);
      } else {
        setMonth(m => m + 1);
      }
    }

    const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    return React.createElement('div', { style: { background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 20, marginBottom: 32, maxWidth: 700 } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 } },
        React.createElement('button', { onClick: prevMonth, style: { background: '#e0e7ef', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontWeight: 500 } }, '<'),
        React.createElement('span', { style: { fontWeight: 600, fontSize: 18 } }, monthNames[month] + ' ' + year),
        React.createElement('button', { onClick: nextMonth, style: { background: '#e0e7ef', border: 'none', borderRadius: 4, padding: '4px 12px', cursor: 'pointer', fontWeight: 500 } }, '>')
      ),
      React.createElement('table', { style: { width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' } },
        React.createElement('thead', null,
          React.createElement('tr', null,
            dayNames.map(d => React.createElement('th', { key: d, style: { color: '#888', fontWeight: 500, padding: 4, fontSize: 14 } }, d))
          )
        ),
        React.createElement('tbody', null,
          weeks.map((week, i) =>
            React.createElement('tr', { key: i },
              week.map((date, j) =>
                React.createElement('td', {
                  key: j,
                  style: {
                    border: '1px solid #f0f0f0',
                    height: 60,
                    verticalAlign: 'top',
                    background: date === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? '#e0e7ef' : '#fff',
                    padding: 4,
                    fontSize: 13
                  }
                },
                  date && React.createElement('div', { style: { fontWeight: 600 } }, date),
                  date && eventsByDate[`${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`] &&
                    eventsByDate[`${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`].map(ev =>
                      React.createElement('div', {
                        key: ev.id,
                        style: {
                          background: ev.color || '#30405a',
                          color: ['yellow', 'green', 'blue', 'purple', 'red'].includes(ev.color) ? '#fff' : '#fff',
                          borderRadius: 4,
                          padding: '2px 6px',
                          margin: '2px 0',
                          fontSize: 12,
                          fontWeight: 500,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          ...(ev.color === 'yellow' ? { background: '#ffe066', color: '#222' } :
                            ev.color === 'green' ? { background: '#4caf50' } :
                            ev.color === 'blue' ? { background: '#2196f3' } :
                            ev.color === 'purple' ? { background: '#9c27b0' } :
                            ev.color === 'red' ? { background: '#f44336' } : {})
                        }
                      }, ev.name)
                    )
                )
              )
            )
          )
        )
      )
    );
  }

  if (!user) {
    // Show login/register form
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

  return (
    React.createElement('div', null,
      React.createElement('aside', { style: sidebarStyle },
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
          ['Dashboard', 'Campaign Manager', 'Tools', 'Settings'].map(tab =>
            React.createElement('a', {
              key: tab,
              style: Object.assign({}, navLinkStyle, activeTab === tab ? navLinkActive : {}),
              onMouseOver: handleMouseOver,
              onMouseOut: handleMouseOut,
              onClick: () => handleNavClick(tab),
              'data-active': activeTab === tab ? 'true' : undefined,
            }, tab)
          )
        ),
        React.createElement('div', { style: { marginTop: 32 } },
          React.createElement('button', {
            onClick: handleLogout,
            style: { background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 20px', cursor: 'pointer', fontWeight: 500, width: '80%' }
          }, 'Logout'),
          React.createElement('div', { style: { color: '#fff', marginTop: 10, fontSize: 14, textAlign: 'center' } }, user)
        )
      ),
      React.createElement('main', { style: mainStyle },
        renderMain()
      )
    )
  );
}
