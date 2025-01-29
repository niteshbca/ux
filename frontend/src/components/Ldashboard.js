import React from 'react';
import { useNavigate } from 'react-router-dom';  // For navigation

const Ldashboard = () => {
  const navigate = useNavigate();

  const handleQRCreate = () => {
    // Navigate to QR Creator page (or handle QR generation logic)
    console.log('Navigating to QR Creator...');
    navigate('/qr-creator');
  };

  const handleTranport = () => {
    // Navigate to Godown page (or handle godown logic)
    console.log('Navigating to Godown...');
    navigate('/home');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(45deg, red, yellow, green, blue, purple)',
        animation: 'backgroundAnimation 5s infinite alternate', // background color animation
      }}
    >
      <h2
        style={{
          fontSize: '44px',
          color: 'white',
          animation: 'textAnimation 2s ease-in-out infinite', // text style animation
        }}
      >
        Welcome to the Dashboard
      </h2>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handleQRCreate}
          style={{
            backgroundColor: 'green',
            color: 'white',
            fontSize:'20px',
            padding: '10px 20px',
            width: '200px',
            marginBottom: '10px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            animation: 'buttonAnimation 2s infinite', // button style animation
          }}
        >
          QR Creator
        </button>
      </div>
      <div>
        <button
          onClick={handleTranport}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            fontSize:'20px',
            padding: '10px 20px',
            width: '200px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, transform 0.3s ease',
            animation: 'buttonAnimation 2s infinite', // button style animation
          }}
        >
          Transport
        </button>
      </div>
    </div>
  );
};

export default Ldashboard;

// Add the following CSS keyframes for animations

const styles = `
  @keyframes backgroundAnimation {
    0% {
      background: linear-gradient(45deg, red, yellow, green, blue, purple);
    }
    100% {
      background: linear-gradient(45deg, purple, blue, green, yellow, red);
    }
  }
  
  @keyframes textAnimation {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(-10px);
      opacity: 0.7;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes buttonAnimation {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;

document.head.insertAdjacentHTML('beforeend', `<style>${styles}</style>`);
