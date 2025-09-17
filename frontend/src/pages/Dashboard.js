import React, { useState } from "react";
import axios from "axios";
import Navbar from "../pages/Navbar";
import Footer from "../pages/Footer";
function Dashboard() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token"); // get saved token
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Prediction failed");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="dashboard">
    <div style={{ padding: "40px" }}>
      <h2 className="heading">🌿 Plant Disease Prediction</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Predict</button>

      {result && (
        <div>
          <h3>Prediction: {result.disease}</h3>
          <p>Confidence: {result.confidence.toFixed(2)}%</p>
        </div>
      )}
    </div>
    </div>
    <Footer/>
    </>
  );
}

export default Dashboard;
