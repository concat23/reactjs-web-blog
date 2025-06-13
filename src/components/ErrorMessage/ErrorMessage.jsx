import React from 'react';
import { AlertCircle } from 'lucide-react';
import './ErrorMessage.scss';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <AlertCircle className="error-icon" size={20} />
      <span className="error-text">{message}</span>
    </div>
  );
};

export default ErrorMessage;
