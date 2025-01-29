import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DeliveryPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  // Access godown data from location.state
  const location = useLocation();
  const godown = location.state ? location.state.godown : null;

  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle Add button click
  const handleAddClick = async () => {
    try {
      console.log('Sending request to backend with input:', inputValue, 'and godown:', godown.name);
      const response = await axios.post('http://localhost:5000/api/checkAndAddItem', {
        input: inputValue,
        godownName: godown.name, // Include godown name in the request body
      });
      console.log('Response from backend:', response);

      if (response.data.success) {
        setMessage('Item added successfully!');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Delivery Page</h2>
      {godown ? (
        <div style={styles.godownDetails}>
          <h3 style={styles.godownHeader}>Godown Details</h3>
          <p style={styles.godownText}><strong>Name:</strong> {godown.name}</p>
          <p style={styles.godownText}><strong>Address:</strong> {godown.address}</p>
        </div>
      ) : (
        <p style={styles.errorText}>No Godown Data Available</p>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Item"
        style={styles.input}
      />
      <button
        onClick={handleAddClick}
        style={styles.button}
        onMouseEnter={(e) => {
          e.target.style.background = 'linear-gradient(45deg, #ff6f61, #f39c12)';
          e.target.style.transform = 'translateY(-3px) scale(1.1)';
          e.target.style.boxShadow = '0 8px 20px rgba(243, 156, 18, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'linear-gradient(45deg,gray,gray)';
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        }}
      >
        Add
      </button>
      <p style={styles.message}>{message}</p>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(45deg, #ff6f61, #6a11cb, #2575fc, #f39c12)',
    backgroundSize: '400% 400%',
    animation: 'backgroundAnimation 10s ease infinite',
    padding: '20px',
  },
  header: {
    color: '#fff',
    fontSize: '3rem',
    marginBottom: '20px',
    textAlign: 'center',
    animation: 'textAnimation 2s infinite',
  },
  godownDetails: {
    backgroundColor: 'rgba(218, 216, 224, 0.6)',
     padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '80%',
    maxWidth: '500px',
    marginBottom: '20px',
  },
  godownHeader: {
    color: 'white',
    fontSize: '1.9rem',
    marginBottom: '10px',
  },
  godownText: {
    fontSize: '1.5rem',
    color: 'white',
    margin: '5px 0',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    width: '80%',
    maxWidth: '400px',
    marginBottom: '15px',
    outline: 'none',
  },
  button: {
    background: 'gray',
    color: '#fff',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.5rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  },
  message: {
    fontSize: '1.1rem',
    color: '#fff',
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
  },
  errorText: {
    color: 'red',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default DeliveryPage;
