import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  // Inline styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    textAlign: "center",
    padding: "20px",
    boxSizing: "border-box",
    background: 'linear-gradient(-45deg, #fcb900, #9900ef, #ff6900, #00ff07)',
  };

  const titleStyle = {
    fontSize: "3.5rem",
    marginBottom: "20px",
    textDecoration: "underline",
    color: "#ffffff",
  };

  const buttonStyle = {
    margin: "10px",
    padding: "15px 30px",
    fontSize: "1.5rem",
    backgroundColor: 'rgba(218, 216, 224, 0.6)',
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.3s ease, background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "light gray",
    transform: "scale(1.1)",
  };

  const buttonActiveStyle = {
    transform: "scale(1.05)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Transport</h1>
      <button
        style={buttonStyle}
        onMouseOver={(e) =>
          Object.assign(e.target.style, buttonHoverStyle)
        }
        onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
        onMouseDown={(e) =>
          Object.assign(e.target.style, buttonActiveStyle)
        }
        onMouseUp={(e) =>
          Object.assign(e.target.style, buttonHoverStyle)
        }
        onClick={() => navigate("/dstaffgodown")}
      >
        Despatch
      </button>
    </div>
  );
};

export default Home;
