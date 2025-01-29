import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DstaffGodown() {
  const [godowns, setGodowns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/godowns`)
      .then(response => {
        setGodowns(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleClick = godown => {
    navigate('/dgodowndetails', { state: { godown } });
  };

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      fontFamily: "'Poppins', sans-serif",
      background: "linear-gradient(45deg, #ff6f61, #6a11cb, #2575fc, #f39c12)",
      backgroundSize: "400% 400%",
      animation: "backgroundAnimation 10s ease infinite",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "20px",
      width: "100%",
    },
    godownCard: {
      width: "300px",
      padding: "20px",
      margin: "20px",
      borderRadius: "20px",
      backgroundColor: 'rgba(218, 216, 224, 0.6)',
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
      transition: "transform 0.4s ease, box-shadow 0.4s ease",
      animation: "cardBounce 2s infinite ease-in-out",
    },
    cardTitle: {
      fontSize: "1.9rem",
      color: "white",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    cardDescription: {
      fontSize: "1.5rem",
      color: "white",
      marginBottom: "20px",
    },
    button: {
      padding: "12px 20px",
      background: "linear-gradient(45deg, #f39c12, #ff5733)",
      color: "#fff",
      border: "none",
      borderRadius: "30px",
      fontSize: "1.2rem",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 5px 15px rgba(243, 156, 18, 0.4)",
    },
    buttonHover: {
      background: "linear-gradient(45deg, #ff6f61, #f39c12)",
      transform: "translateY(-3px) scale(1.1)",
      boxShadow: "0 8px 20px rgba(243, 156, 18, 0.6)",
    },
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        {godowns.map((godown, index) => (
          <div
            key={index}
            style={styles.godownCard}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-15px) scale(1.05)";
              e.target.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.2)";
            }}
          >
            <h3 style={styles.cardTitle}>{godown.name}</h3>
            <p style={styles.cardDescription}>{godown.address}</p>
            <button
              onClick={() => handleClick(godown)}
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.background =
                  "linear-gradient(45deg, #ff6f61, #f39c12)";
                e.target.style.transform = "translateY(-3px) scale(1.1)";
                e.target.style.boxShadow =
                  "0 8px 20px rgba(243, 156, 18, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background =
                  "linear-gradient(45deg, #f39c12, #ff5733)";
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow =
                  "0 5px 15px rgba(243, 156, 18, 0.4)";
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DstaffGodown;
