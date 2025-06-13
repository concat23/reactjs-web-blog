import React, { useState } from 'react';
import { useI18n } from '../../../contexts/I18nContext';
import './Create.scss'; // Đảm bảo SCSS đã được import

const Create = ({ title, fields, onSubmit }) => {

  const { t } = useI18n();

  const initialState = fields.reduce((acc, field) => {
    if (field.type === 'checkbox') {
      acc[field.name] = field.defaultValue ?? false;
    } else {
      acc[field.name] = field.defaultValue ?? '';
    }
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e, field) => {
    const { name, type, value, checked, files } = e.target;

    let newValue = value;
    if (type === 'checkbox') {
      newValue = checked;
    } else if (type === 'file') {
      newValue = field.multiple ? [...files] : files[0];
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (message) setMessage('');
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const requiredFields = fields.filter((f) => f.required !== false);
  const hasEmpty = requiredFields.some((f) => {
    const val = formData[f.name];
    if (f.type === 'checkbox') return !val;
    return !val || val === '';
  });

  if (hasEmpty) {
    setMessage(t('dashboard.validationFillRequired'));
    return;
  }

  try {
    setLoading(true);
    const dataToSubmit = { ...formData };

    // ✅ Nếu có trường uploadImages, tiến hành upload từng ảnh
    if (dataToSubmit.uploadImages) {
      const uploadedUrls = [];

      for (const file of dataToSubmit.uploadImages) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('upload_preset', 'your_upload_preset');

        const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
          method: 'POST',
          body: formDataUpload,
        });

        const json = await res.json();
        uploadedUrls.push(json.secure_url);
      }

      // Gán lại đường dẫn vào uploadImages
      dataToSubmit.uploadImages = uploadedUrls;
    }

    await onSubmit(dataToSubmit);
    setMessage(t('dashboard.createdSuccessfully', { title }));
    setFormData(initialState);
  } catch (err) {
    setMessage(t('dashboard.errorCreating', { title: title.toLowerCase(), message: err.message }));
  } finally {
    setLoading(false);
  }
};

  const renderField = (field) => {
    const { name, label, type, options, multiple, placeholder } = field;
    const value = formData[name];

    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={(e) => handleChange(e, field)}
            placeholder={placeholder}
            required={field.required !== false}
          />
        );
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={(e) => handleChange(e, field)}
            multiple={multiple}
            required={field.required !== false}
          >
            <option value="">{t('dashboard.selectPlaceholder') /* "-- Chọn --" */}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={(e) => handleChange(e, field)}
            required={field.required !== false}
          />
        );
      case 'file':
        return (
          <input
            type="file"
            name={name}
            onChange={(e) => handleChange(e, field)}
            multiple={multiple}
            accept={field.accept || '*/*'}
            required={field.required !== false}
          />
        );
      default:
        return (
          <input
            type={type || 'text'}
            name={name}
            value={value}
            onChange={(e) => handleChange(e, field)}
            placeholder={placeholder}
            step={field.step}
            required={field.required !== false}
          />
        );
    }
  };

  return (
    <div className="form-wrapper create-form">
      <h2 className="form-title">{title}</h2>
      {message && <p className="form-message">{message}</p>}
      <form id="createForm" className="form" onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name} className="form-label">{field.label}:</label><br />
            {renderField(field)}
          </div>
        ))}
        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? t('dashboard.creating') /* "Đang tạo..." */ : t('dashboard.createButton') /* "Tạo" */}
        </button>
      </form>
    </div>
  );
};

export default Create;
