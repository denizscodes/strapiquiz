import React from "react";

class CSVToJsonConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jsonData: null,
      errorMessage: "", // Hata mesajını saklamak için yeni bir state ekledik
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.csvToJson = this.csvToJson.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);
  }

  handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const jsonData = this.csvToJson(csvData);
        this.setState({ jsonData, errorMessage: "" }); // Set JSON data to state
        console.log(jsonData); // Log JSON data to console

        // Send JSON data to the server
        this.sendDataToServer(jsonData);
      };
      reader.readAsText(file);
    }
  }

  csvToJson(csvData) {
    // Remove trailing whitespaces, including '\r' and '\n'
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

    return jsonData; // Return JSON object array
  }

  sendDataToServer(jsonData) {
    fetch("http://localhost:1337/api/uruns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data sent successfully:", data);
        // Optionally, you can handle the response from the server here
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        this.setState({ errorMessage: "Error sending data to server" }); // Hata durumunda mesajı ayarla
      });
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileChange} accept=".csv" />
        {this.state.errorMessage && <p>{this.state.errorMessage}</p>}{" "}
        {/* Hata mesajını ekranda göster */}
        {this.state.jsonData && (
          <div>
            <h2>JSON Output:</h2>
            <pre>{JSON.stringify(this.state.jsonData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}

export default CSVToJsonConverter;
