import React, { useState, useEffect } from "react";
import Barcode from "react-barcode";
import axios from "axios";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const QRCreater = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [batchNumber, setBatchNumber] = useState("");
  const [numberOfBarcodes, setNumberOfBarcodes] = useState(1);
  const [location, setLocation] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [username, setUsername] = useState("");
  const [batchNumbers, setBatchNumbers] = useState([]);

  // Fetch location using OpenCage API or reverse geolocation API
  const fetchLocation = async (lat, long) => {
    const apiKey = "1a49c2f11ba74841bb2b563c7569b33c"; // Replace with your OpenCage API key
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${apiKey}`
      );
      const { city, state, country } = response.data.results[0].components;
      setLocation(`${city || ""}, ${state}, ${country || ""}`);
    } catch (error) {
      console.error("Error fetching location:", error);
      setLocation("Location Unavailable");
    }
  };

  // Get current time and location on component mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocation(latitude, longitude); // Automatically get location from the device
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation("Location Unavailable");
      }
    );

    // Set current time
    const date = new Date();
    setCurrentTime(date.toLocaleString());
  }, []);

  // Handle batch number collection and increment
  useEffect(() => {
    if (batchNumber) {
      const startBatchNumber = parseInt(batchNumber);
      setBatchNumbers(
        Array.from({ length: numberOfBarcodes }, (_, index) => startBatchNumber + index)
      );
    }
  }, [batchNumber, numberOfBarcodes]);

  // Function to handle PDF creation for individual barcodes
  const handleDownloadAllBarcodesPDF = async () => {
    const doc = new jsPDF({
      orientation: "portrait", // portrait for 4x6 size (portrait is more common for small printouts)
      unit: "in",
      format: [4, 6], // Setting page size to 4x6 inches
    });

    // Loop through each barcode and add it to the PDF
    for (let index = 0; index < numberOfBarcodes; index++) {
      const barcodeDiv = document.getElementById(`barcode-div-${index}`);

      if (barcodeDiv) {
        // Use html2canvas to capture only the contents of the barcode div
        const canvas = await html2canvas(barcodeDiv, {
          scrollX: 0,
          scrollY: -window.scrollY, // Adjust for any page scroll
          x: 0,
          y: 0,
          width: barcodeDiv.offsetWidth,
          height: barcodeDiv.offsetHeight,
          useCORS: true, // Enable CORS to fetch external images (if any)
          backgroundColor: null, // Make the background transparent
          removeContainer: true, // Remove the outer container to avoid border and background color
        });

        const imgData = canvas.toDataURL("image/png");

        // If not the first barcode, add a new page to the PDF
        if (index > 0) {
          doc.addPage();
        }

        // Add the barcode image to the PDF
        doc.addImage(imgData, "PNG", 0.5, 0.5, 3, 5.5); // Scale the image to fit in the page size
      }
    }

    // Save the PDF with all barcodes
    doc.save("barcodes.pdf");
  };

  // Function to handle printing of the final barcode
  const handlePrint = () => {
    const content = document.getElementById("barcode-total");

    if (content) {
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Final Barcode</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                text-align: center;
              }
              .barcode-container {
                width: 4in;
                height: 6in;
                text-align: center;
                margin: auto;
                font-weight: bold; /* Bold font */
                border: 1px solid #000; /* Optional border for the print layout */
              }
            </style>
          </head>
          <body>
            <div class="barcode-container">${content.innerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Generate Barcodes</h2>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Enter Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter Batch Number"
          value={batchNumber}
          onChange={(e) => setBatchNumber(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Number of Barcodes"
          value={numberOfBarcodes}
          onChange={(e) => setNumberOfBarcodes(e.target.value)}
          required
          style={styles.input}
        />
        
      </div>

      {/* Generate individual barcodes */}
      {Array.from({ length: numberOfBarcodes }).map((_, index) => (
        <div
          id={`barcode-div-${index}`}
          key={index}
          style={styles.barcodeContainer}
        >
          {/* Only batch number in the barcode value */}
          <Barcode
            value={`${batchNumbers[index]}`}  // Only batch number
            width={2}
            height={60}
            fontSize={28}
          />

         <div style={styles.barcodeDetails}>
          {/* Displaying batch number only */}
           <p style={{color:"black", fontSize:"15px", fontWeight:"bold"}}><p>Product Name: {productName}</p>
            <p>Price: {price}</p>
            <p>Username: {username}</p>
            <p>Batch Number: {batchNumbers[index]}</p>
            <p>Location: {location}</p>
            <p>Time: {currentTime}</p></p>
           
          </div>
        </div>
      ))}

      {/* Download All Barcodes PDF button */}
      <button onClick={handleDownloadAllBarcodesPDF} style={styles.printButton}>
        Download All Barcodes as PDF
      </button>

      {/* Final barcode with the start and end batch numbers */}
      <div
        id="barcode-total"
        style={styles.finalBarcodeContainer}
      >
        <h3 style={styles.finalBarcodeHeading}>Final Barcode</h3>

        {/* Final barcode value showing batch number range */}
        <Barcode
          value={`${batchNumbers[0]}-${batchNumbers[batchNumbers.length - 1]}`} // Batch number range
          width={2}
          height={60}
          fontSize={28}
        />
        <div style={styles.barcodeDetails}>
          {/* Displaying batch number range */}
          <p style={{color:"black", fontSize:"15px"}}>  <h1>Product Name: {productName}</h1>
          <h1>Price: {price}</h1>
          <h1>Username: {username}</h1>
          <h1>Batch Numbers: {batchNumbers[0]} to {batchNumbers[batchNumbers.length - 1]}</h1>
          <h1>Location: {location}</h1>
          <h1>Time: {currentTime}</h1></p>
         
          
        </div>
      </div>

      {/* Print Final Barcode button */}
      <button onClick={handlePrint} style={styles.printButton}>
        Print Final Barcode
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "30px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "800px",
    margin: "auto",
  },
  heading: {
    color: "#333",
    marginBottom: "20px",
    fontSize: "44px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "100%",
    maxWidth: "350px",
    margin: "0 auto",
  },
  barcodeContainer: {
    margin: "20px",
    padding: "15px",
    border: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    fontSize: "10px",
    fontWeight: "bold",
    display: "inline-block",
    width: "200px",
  },
  barcodeDetails: {
    fontSize: "12px",
    marginTop: "10px",
    color: "#555",
  },
  printButton: {
    margin: "10px",
    padding: "8px 15px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  },
  finalBarcodeContainer: {
    margin: "20px",
    padding: "15px",
    border: "none",
    backgroundColor: "transparent",
    textAlign: "left",
    fontSize: "10px",
    fontWeight: "bold",
    display: "inline-block",
    width: "100%",
  },
  finalBarcodeHeading: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default QRCreater;
