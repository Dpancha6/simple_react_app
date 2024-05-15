import React, { useState } from "react";
import axios from "axios";

const NameForm = () => {
  const [name, setName] = useState("");
  const [predictedAge, setPredictedAge] = useState(null);
  const [ageCache, setAgeCache] = useState({});

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ageCache[name]) {
      // Name is in the cache, update the predictedAge state
      setPredictedAge(ageCache[name]);
    } else {
      try {
        const response = await axios.get(`https://api.agify.io?name=${name}`);
        setPredictedAge(response.data.age);

        console.log(response.data);
        setAgeCache({ ...ageCache, [name]: predictedAge });

        // Handle the API response here (e.g., display the predicted age)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "200px auto",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={formStyle}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter your name"
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Submit
        </button>
      </form>
      {predictedAge !== null && <p>Predicted age: {predictedAge}</p>}
    </div>
  );
};

export default NameForm;
