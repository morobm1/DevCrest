import React, { useState } from "react";

const tabs = [
  { key: "home", label: "Home Dashboard" },
  { key: "event", label: "Marketing Event Planner" },
  { key: "social", label: "Social Media Review" },
  { key: "tool4", label: "Tool 4" },
  { key: "tool5", label: "Tool 5" },
  { key: "tool6", label: "Tool 6" },
];

function HomeDashboard() {
  return <div><h2>Home Dashboard</h2><p>Overview and quick stats.</p></div>;
}
function MarketingEventPlanner() {
  return <div><h2>Marketing Event Planner</h2><p>Plan and manage your marketing events here.</p></div>;
}
function SocialMediaReview() {
  return <div><h2>Social Media Review</h2><p>Analyze and review your social media performance.</p></div>;
}
function Placeholder({ label }) {
  return <div><h2>{label}</h2><p>Coming soon...</p></div>;
}

function App() {
  const [activeTab, setActiveTab] = useState("home");

  let content;
  switch (activeTab) {
    case "home":
      content = <HomeDashboard />;
      break;
    case "event":
      content = <MarketingEventPlanner />;
      break;
    case "social":
      content = <SocialMediaReview />;
      break;
    case "tool4":
    case "tool5":
    case "tool6":
      content = <Placeholder label={tabs.find(t => t.key === activeTab).label} />;
      break;
    default:
      content = null;
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      <nav style={{ width: 220, background: "#222", color: "#fff", padding: 0 }}>
        <div style={{ padding: "1.5rem 1rem", fontWeight: "bold", fontSize: 22, borderBottom: "1px solid #333" }}>
          Marketing Multi Tool
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tabs.map(tab => (
            <li key={tab.key}>
              <button
                onClick={() => setActiveTab(tab.key)}
                style={{
                  width: "100%",
                  padding: "1rem 1.5rem",
                  background: activeTab === tab.key ? "#444" : "none",
                  color: "inherit",
                  border: "none",
                  textAlign: "left",
                  cursor: "pointer",
                  fontSize: 16,
                  outline: "none"
                }}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main style={{ flex: 1, padding: "2rem", background: "#f7f7f7" }}>
        {content}
      </main>
    </div>
  );
}

export default App;
