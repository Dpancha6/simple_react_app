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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>

      {predictedAge !== null && <p>Predicted age: {predictedAge}</p>}
    </div>
  );
};

export default NameForm;
