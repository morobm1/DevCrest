import React, { useState } from "react";

const projects = [
  { id: 1, name: "Residential village" },
  { id: 2, name: "Ivory house" },
  { id: 3, name: "Ferry Street Flats" },
  { id: 4, name: "Florida Poly Phase I" },
];

export default function ProjectSelector() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h2>Select a Project</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {projects.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedProject(project)}
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: selectedProject?.id === project.id ? "#e0f7fa" : "#fff",
              cursor: "pointer",
              textAlign: "left",
              fontWeight: selectedProject?.id === project.id ? "bold" : "normal",
            }}
          >
            {project.name}
          </button>
        ))}
      </div>
      {selectedProject && (
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #eee", borderRadius: "8px", background: "#fafafa" }}>
          <h3>Project Details</h3>
          <p><strong>Name:</strong> {selectedProject.name}</p>
          {/* Add more project details here as needed */}
        </div>
      )}
    </div>
  );
}