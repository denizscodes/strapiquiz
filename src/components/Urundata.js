import React, { useState, useCallback } from "react";

const CsvUploader = () => {
  const [csvData, setCsvData] = useState(null);

  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const text = reader.result;
      const result = parseCsv(text);
      setCsvData(result);
    };

    reader.readAsText(file);
  }, []);

  const parseCsv = (csvText) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",").map((header) => header.trim());
    const data = lines.slice(1).map((line) => {
      const values = line.split(",").map((value) => value.trim());
      const entry = {};
      headers.forEach((header, index) => {
        entry[header] = values[index];
      });
      return entry;
    });
    return JSON.stringify(data); // Convert data to JSON string
  };

  const uploadCsvToStrapi = async () => {
    try {
      if (!csvData) {
        console.error("CSV verisi bulunamadı.");
        return;
      }

      console.log("Gönderilen JSON verisi:", csvData);

      const response = await fetch("http://localhost:1337/api/csvtojsons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { jsondata: JSON.parse(csvData) },
        }),
      });

      console.log("Sunucu yanıtı:", response);

      if (response.ok) {
        console.log("Veri başarıyla yüklendi.");
      } else {
        console.error("Veri yüklenirken hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={uploadCsvToStrapi} disabled={!csvData}>
        Veriyi Yükle
      </button>
    </div>
  );
};

export default CsvUploader;
