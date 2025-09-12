import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🌿 Plant Disease Prediction</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Predict</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h2>Prediction: {result.disease}</h2>
          <p>Confidence: {result.confidence.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}

export default App;

