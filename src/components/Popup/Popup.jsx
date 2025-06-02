import React from 'react';

const Popup = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}  // đóng popup khi click bên ngoài box
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          minWidth: '300px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()} // tránh đóng khi click trong popup
      >
        <div style={{ marginBottom: '15px' }}>{message}</div>
        <button onClick={onClose} style={{ padding: '6px 12px' }}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
