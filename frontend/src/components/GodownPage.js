import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const GodownPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const godown = location.state.godown;

  const handleDeliveryClick = () => {
    navigate('/delivery', { state: { godown } });
  };

  const handleInventoryClick = () => {
    navigate('/inventory', { state: { godown } });
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(-45deg, #fcb900, #9900ef, #ff6900, #00ff07)',
      padding: '20px',
    },
    header: {
      color: 'white',
      marginBottom: '20px',
      fontSize: '3.5rem',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 'bold',
      textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
      animation: 'textGlow 1.5s ease-in-out infinite alternate',
    },
    paragraph: {
      fontSize: '1.5rem',
      color: '#333',
      marginBottom: '10px',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px 20px',
      borderRadius: '10px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    },
    buttonContainer: {
      display: 'flex',
      gap: '20px',
      marginTop: '20px',
    },
    button: {
      background: 'gray',
      color: '#fff',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '30px',
      fontSize: '1.6rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(243, 156, 18, 0.4)',
    },
    buttonHover: {
      background: 'linear-gradient(45deg, #ff6f61, #f39c12)',
      transform: 'translateY(-3px) scale(1.1)',
      boxShadow: '0 8px 20px rgba(243, 156, 18, 0.6)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Godown Dashboard</h2>
      <p style={styles.paragraph}>
        <strong>Name:</strong> {godown.name}
      </p>
      <p style={styles.paragraph}>
        <strong>Address:</strong> {godown.address}
      </p>

      <div style={styles.buttonContainer}>
        <button
          onClick={handleDeliveryClick}
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.background =
              'linear-gradient(45deg, #ff6f61, #f39c12)';
            e.target.style.transform = 'translateY(-3px) scale(1.1)';
            e.target.style.boxShadow =
              '0 8px 20px rgba(243, 156, 18, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              'linear-gradient(45deg, #f39c12, #ff5733)';
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow =
              '0 5px 15px rgba(243, 156, 18, 0.4)';
          }}
        >
          Delivery
        </button>
        <button
          onClick={handleInventoryClick}
          style={styles.button}
          onMouseEnter={(e) => {
            e.target.style.background =
              'linear-gradient(45deg, #ff6f61, #f39c12)';
            e.target.style.transform = 'translateY(-3px) scale(1.1)';
            e.target.style.boxShadow =
              '0 8px 20px rgba(243, 156, 18, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background =
              'linear-gradient(45deg, #f39c12, #ff5733)';
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow =
              '0 5px 15px rgba(243, 156, 18, 0.4)';
          }}
        >
          Inventory
        </button>
      </div>
    </div>
  );
};

export default GodownPage;
