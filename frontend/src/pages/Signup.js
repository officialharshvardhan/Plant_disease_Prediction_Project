import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/signup", { email, password });
      if (res.data.success) {
        alert("Signup successful! Please login.");
        navigate("/");
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup error");
    }
  };

  return (
    <>
    <nav style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "15px 30px", 
      backgroundColor: "#2e7d32", 
      color: "white" 
    }}>
      <h2>🌿 Plant Disease App</h2>
    </nav>
    <div className="signup" style={{ padding: "40px" }}>
      <h2>Signup</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br/>
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br/>
      <button onClick={handleSignup}>Signup</button>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
    </>
  );
}

export default Signup;
