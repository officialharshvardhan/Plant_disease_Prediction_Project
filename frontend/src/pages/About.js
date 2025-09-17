import React from "react";
import Navbar from "../pages/Navbar";
import Footer from "./Footer";

function About() {
  return (
    <div>
      <Navbar />
      <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        <h2>About This Project 🌿</h2>
        <p style={{ lineHeight: "1.8", fontSize: "16px" }}>
          The <strong>Plant Disease Prediction System</strong> is a web-based application 
          designed to help farmers and agricultural researchers identify plant 
          diseases quickly using deep learning. By simply uploading an image of a leaf, 
          our trained model can predict whether the plant is healthy or suffering from a disease, 
          along with the confidence level of the prediction.
        </p>

        <h3>✨ Features</h3>
        <ul style={{ lineHeight: "1.8", fontSize: "16px" }}>
          <li>🔍 Upload a leaf image and get instant predictions</li>
          <li>📊 Confidence score to understand model reliability</li>
          <li>🛡️ Secure login & signup system with JWT authentication</li>
          <li>☁️ Integration with MongoDB for user management</li>
          <li>🌐 Modern UI built with React and Flask as the backend</li>
        </ul>

        <h3>⚙️ Technologies Used</h3>
        <ul style={{ lineHeight: "1.8", fontSize: "16px" }}>
          <li><strong>Frontend:</strong> React.js (with React Router, Axios)</li>
          <li><strong>Backend:</strong> Flask (Python, Flask-CORS, JWT authentication)</li>
          <li><strong>Machine Learning:</strong> TensorFlow/Keras (Convolutional Neural Network)</li>
          <li><strong>Database:</strong> MongoDB (for storing user accounts)</li>
        </ul>

        <h3>🌍 Why This Project?</h3>
        <p style={{ lineHeight: "1.8", fontSize: "16px" }}>
          Agriculture plays a crucial role in our economy, but plant diseases can 
          cause major losses to farmers. Early detection of diseases can help farmers 
          take preventive measures, increase crop yield, and reduce losses. This project 
          aims to make disease detection <strong>accessible, affordable, and fast</strong>.
        </p>

        <h3>👨‍💻 Developer</h3>
        <p style={{ lineHeight: "1.8", fontSize: "16px" }}>
          Developed by <strong>Harsh Vardhan</strong>, a web developer and machine learning enthusiast, 
          passionate about building impactful applications that combine AI and modern web technologies.
        </p>
      </div>
      <Footer/>
    </div>
  );
}

export default About;
