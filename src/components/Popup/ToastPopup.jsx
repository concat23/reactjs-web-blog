import React, { useEffect } from 'react';

const ToastPopup = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div style={styles.toast}>
      {message}
    </div>
  );
};

const styles = {
  toast: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    backgroundColor: '#333',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: 6,
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    zIndex: 10000,
  }
};

export default ToastPopup;
