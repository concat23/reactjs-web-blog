import React from 'react';
import './Input.scss';
import FieldError from '../FieldError/FieldError';

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
        <FieldError name="error" error={error} />
      )}
    </div>
  );
};

export default Input;
