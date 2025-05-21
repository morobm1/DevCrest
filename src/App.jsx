import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectSelector from "./ProjectSelector";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Welcome to DevCrest</h1>
      <p>This is the homepage. Go to <a href="/master">/master</a> to view projects.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/master" element={<ProjectSelector />} />
      </Routes>
    </Router>
  );
}

export default App;
