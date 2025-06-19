import React from 'react';
import './FileUploadInput.scss';

const FileUploadInput = ({
  label,
  accept,
  multiple = true,
  onChange,
  helperText,
}) => {
  return (
    <div className="upload-wrapper">
      <label className="upload-label">
        {label}
      </label>

      <input
        type="file"
        id="file-input"
        multiple={multiple}
        accept={accept}
        onChange={onChange}
      />

      <p className="upload-helper-text">
        {helperText}
      </p>
    </div>
  );
};

export default FileUploadInput;
