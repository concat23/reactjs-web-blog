import React from 'react';
import './Input.scss';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  placeholder = '',
  onChange,
  onBlur,
  disabled = false,
  error = '',
  className = '',
  style = {},
  required = false,  
}) => {
  return (
    <div className={`input-wrapper ${className}`} style={style}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        className={`custom-input ${error ? 'error' : ''}`}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}  
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <span
          id={`${name}-error`}
          style={{ color: '#dc3545', marginTop: '4px', fontSize: '13px' }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
