import React from 'react';
import './FieldError.scss';

const FieldError = ({ error, name }) => {
  if (!error) return null;

  return (
    <span id={`${name}-error`} className="field-error">
      {error}
    </span>
  );
};

export default FieldError;
