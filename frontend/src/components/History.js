import React, { useState, useEffect } from "react";

const History = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/sales");
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const styles = {
    container: {
      background: 'linear-gradient(-45deg, #fcb900, #9900ef, #ff6900, #00ff07)',
      animation: "gradientShift 6s infinite alternate",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "'Roboto', sans-serif",
      color: "#333",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    title: {
      fontSize: "3.9rem",
      color: "white",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
      marginBottom: "20px",
      textAlign: "center",
    },
    loadingText: {
      fontSize: "1.2rem",
      color: "#fff",
      animation: "fadeIn 2s infinite",
    },
    godownCard: {
      backgroundColor: 'rgba(218, 216, 224, 0.6)',
      borderRadius: "15px",
      padding: "20px",
      margin: "10px 0",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
      width: "90%",
      maxWidth: "800px",
      transition: "transform 0.3s, box-shadow 0.3s",
    },
    godownTitle: {
      fontSize: "1.8rem",
      color: "white",
      marginBottom: "10px",
    },
    salesList: {
      listStyleType: "none",
      padding: "0",
    },
    saleItem: {
      backgroundColor: 'rgba(218, 216, 224, 0.6)',
      borderRadius: "28px",
      padding: "10px",
      margin: "8px 0",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
    saleItemHover: {
      transform: "scale(1.03)",
      boxShadow: "0 4px 10px rgba(11, 236, 26, 0.3)",
    },
    label: {
      fontWeight: "bold",
      color: "white",
      fontSize:"20px",
    },
  
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sales History</h1>
      {salesData.length === 0 ? (
        <p style={styles.loadingText}>Loading...</p>
      ) : (
        salesData.map((godownData) => (
          <div key={godownData._id} style={styles.godownCard}>
            <h2 style={styles.godownTitle}>Godown: {godownData._id}</h2>
            <ul style={styles.salesList}>
              {godownData.sales.map((sale) => (
                <li
                  key={sale._id}
                  style={styles.saleItem}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = styles.saleItemHover.transform;
                    e.currentTarget.style.boxShadow = styles.saleItemHover.boxShadow;
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
                  }}
                >
                  <p style={{color:'white', fontSize:'20px'}}>
                    <span style={styles.label}>Name:</span> {sale.name}
                  </p>
                  <p style={{color:'white', fontSize:'20px'}}>
                    <span style={styles.label}>Username:</span> {sale.userName}
                  </p>
                  <p style={{color:'white', fontSize:'20px'}}>
                    <span style={styles.label}>Mobile Number:</span>{" "}
                    {sale.mobileNumber}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default History;
