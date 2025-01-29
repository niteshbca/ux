import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const InventoryPage = () => {
  const location = useLocation();
  const godown = location.state?.godown; // Retrieve the godown data

  const [deliveryItems, setDeliveryItems] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDeliveryItems = async () => {
      if (!godown) {
        setMessage("No godown selected.");
        return;
      }

      try {
        const response = await axios.get("http://18.228.13.1:5000/api/getDeliveryItems", {
          params: { godown: godown.name }, // Pass godown name as a query parameter
        });

        if (response.data.success) {
          setDeliveryItems(response.data.data);
        } else {
          setMessage(response.data.message || "No delivery items found.");
        }
      } catch (error) {
        console.error("Error fetching delivery items:", error);
        setMessage("An error occurred while fetching the data.");
      }
    };

    fetchDeliveryItems();
  }, [godown]); // Depend on godown to refetch if it changes

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: 'linear-gradient(-45deg, #fcb900, #9900ef, #ff6900, #00ff07)',
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 8s ease infinite",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes hoverGlow {
            from { box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); }
            to { box-shadow: 0 0 20px rgba(0, 0, 0, 0.3); }
          }
          @keyframes tableRowHover {
            from { background-color: #ffffff; }
            to { background-color: #f1f1f1; }
          }
        `}
      </style>

      <h2
        style={{
          color: "white",
          fontSize: "3rem",
          marginBottom: "20px",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Inventory Page
      </h2>
      {godown && (
        <div
          style={{
            backgroundColor: 'rgba(218, 216, 224, 0.6)',
            backgroundSize: "200% 200%",
            animation: "divAnimation 3s ease-in-out infinite",
            padding: "15px",
            borderRadius: "10px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
            width: "90%",
            maxWidth: "500px",
            marginBottom: "20px",
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
            <strong>Godown Name:</strong> {godown.name}
          </p>
          <p style={{ fontSize: "1.2rem", margin: "5px 0" }}>
            <strong>Godown Address:</strong> {godown.address}
          </p>
        </div>
      )}
      {message && (
        <p
          style={{
            fontSize: "1.2rem",
            color: "#ff4e50",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {message}
        </p>
      )}

      <table
        style={{
          width: "90%",
          maxWidth: "800px",
          borderCollapse: "collapse",
          margin: "20px 0",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          overflow: "hidden",
          animation: "fadeIn 1s ease-out",
        }}
      >
        <thead
          style={{
            backgroundColor: "#6c63ff",
            animation: "fadeIn 1s ease-out",
          }}
        >
          <tr>
            <th
              style={{
                color: "white",
                padding: "15px",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderBottom: "2px solid #ffffff",
                transition: "all 0.3s ease",
              }}
            >
              Item Name
            </th>
        <th
              style={{
                color: "white",
                padding: "15px",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderBottom: "2px solid #ffffff",
                transition: "all 0.3s ease",
              }}
            >
              
            </th>
            <th
              style={{
                color: "white",
                padding: "15px",
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "1.2rem",
                borderBottom: "2px solid #ffffff",
                transition: "all 0.3s ease",
              }}
            >
              
            </th>
          </tr>
        </thead>
        <tbody>
          {deliveryItems.length === 0 ? (
            <tr>
              <td
                style={{
                  textAlign: "center",
                  padding: "15px",
                  fontSize: "1.1rem",
                  color: "#555",
                }}
                colSpan="3"
              >
                No items available
              </td>
            </tr>
          ) : (
            deliveryItems.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #ddd",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9f9f9";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                }}
              >
                <td style={{ padding: "12px", fontSize: "1rem", color: "#333" }}>
                  {item.name}
                </td>
                <td style={{ padding: "12px", fontSize: "1rem", color: "#333" }}>
                  {item.date}
                </td>
                <td style={{ padding: "12px", fontSize: "1rem", color: "#333" }}>
                  {item.time}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryPage;
