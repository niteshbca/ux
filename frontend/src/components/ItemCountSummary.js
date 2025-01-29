import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemCountSummary = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
        setLoading(false);
      });
  }, []);
// Inline CSS Styles
const containerStyle = {
  textAlign: 'center',
  marginTop: '30px',
  padding: '20px',
  background: 'linear-gradient(-45deg, #fcb900, #9900ef, #ff6900, #00ff07)',
  borderRadius: '10px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  Width: '1800px',
  height:'670px',
  marginLeft: 'auto',
  marginRight: 'auto',
  
};
  const headingStyle = {
    color: 'white',
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const thStyle = {
    backgroundColor: '#673AB7',
    color: 'white',
    padding: '10px',
    fontSize: '1.2rem',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '1rem',
  };

  const loadingStyle = {
    fontSize: '1.5rem',
    color: '#ff5722',
  };

  if (loading) {
    return <div style={loadingStyle}>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Item Count Summary</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>S.No</th>
            <th style={thStyle}>Item Name</th>
            
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item._id}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{item.name}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemCountSummary;
