import React, { useState, useCallback } from "react";

const CSVToJsonConverter = () => {
  const [jsonData, setJsonData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const jsonData = csvToJson(csvData);
        setJsonData(jsonData); // Set JSON data to state
        console.log(jsonData); // Log JSON data to console

        // Send JSON data to the server
        sendDataToServer(jsonData);
      };
      reader.readAsText(file);
    }
  }, []);

  const csvToJson = (csvData) => {
    csvData = csvData.trim();
    const lines = csvData.split("\n");
    const headers = lines[0].split(",");
    const jsonData = [];

    for (let i = 1; i < lines.length; i++) {
      const data = lines[i].split(",");
      const obj = {};

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = data[j].trim();
      }

      jsonData.push(obj);
    }

    return jsonData;
  };

  const sendDataToServer = useCallback((jsonData) => {
    fetch("http://localhost:1337/api/uruns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: jsonData }), // API'nin beklediği veri yapısına uygun şekilde dönüştürüldü
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data sent successfully:", data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setErrorMessage("Error sending data to server");
      });
  }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      {errorMessage && <p>{errorMessage}</p>}
      {jsonData && (
        <div>
          <h2>JSON Output:</h2>
          <ul>
            {jsonData.map((item, index) => (
              <li key={index}>
                <p>urunadi: {item.urunadi}</p>
                <p>obezite: {item.obezite}</p>
                <p>kabizlik: {item.kabizlik}</p>
                <p>stres: {item.stres}</p>
                <p>tasdusurme: {item.tasdusurme}</p>
                <p>ruhsal: {item.ruhsal}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CSVToJsonConverter;
