import React from "react";

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#2e7d32",
      color: "white",
      textAlign: "center",
      padding: "15px",
      marginTop: "40px",
      position: "relative",
      bottom: "0",
      overflow: "hidden",
      width: "98%"
    }}>
      <p>🌱 Plant Disease Prediction System © {new Date().getFullYear()}</p>
      <p>
        Developed by <strong>Harsh Vardhan</strong> | 
        <a href="https://github.com/your-github" target="_blank" rel="noreferrer" style={{ color: "white", marginLeft: "5px" }}>GitHub</a> |
        <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noreferrer" style={{ color: "white", marginLeft: "5px" }}>LinkedIn</a>
      </p>
    </footer>
  );
}

export default Footer;
