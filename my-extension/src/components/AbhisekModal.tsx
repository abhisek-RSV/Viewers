import React from 'react';

const AbhisekModal = ({ pointData, onClose }) => {
  return (
    <div style={{ padding: '20px', minWidth: '300px' }}>
      <h3>Abhisek Measurement Tool</h3>
      <p>Clicked at: X: {pointData.x}, Y: {pointData.y}</p>
      <button 
        onClick={onClose}
        style={{
          padding: '8px 16px',
          background: '#1976d2',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Close
      </button>
    </div>
  );
};

export default AbhisekModal;