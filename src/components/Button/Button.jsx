import React from 'react';
import './Button.scss';

const Button = ({
  label,
  type = 'button',
  variant = 'primary',  // mặc định màu primary
  fontSize,
  fontWeight,
  borderRadius,
  padding,
  margin,
  width,
  disabled = false,
  onClick,
}) => {
  const style = {
    fontSize,
    fontWeight,
    borderRadius,
    padding,
    margin,
    width,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <button
      type={type}
      className={`custom-button ${variant}`}
      style={style}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
