import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear JWT
    navigate("/"); // redirect to login
  };

  return (
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "15px 30px", 
      backgroundColor: "#2e7d32", 
      color: "white" 
    }}>
      <h2>🌿 Plant Disease App</h2>
      <div>
        <Link to="/dashboard" style={{ marginRight: "20px", color: "white", textDecoration: "none" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "20px", color: "white", textDecoration: "none" }}>About</Link>
        <button 
          onClick={handleLogout} 
          style={{ backgroundColor: "white", color: "#2e7d32", border: "none", padding: "6px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
