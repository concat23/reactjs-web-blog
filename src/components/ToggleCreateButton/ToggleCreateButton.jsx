import React, { useState } from 'react';
import Create from '../CRUD/Create/Create';
import { useI18n } from '../../contexts/I18nContext';
import './ToggleCreateButton.scss';

const ToggleCreateButton = ({
  title,
  fields,
  onSubmit,
  buttonLabel,
  buttonIcon: ButtonIcon,
  buttonClassName = '',
  disableToggleOff = false,
  initiallyShown = false,
  showButtonWhenFormShown = false,
  containerClassName = '',
  createComponent: CreateComponent,
}) => {
  const [showForm, setShowForm] = useState(initiallyShown);
  const { t } = useI18n();

  const handleToggle = () => {
    if (showForm && disableToggleOff) return;
    setShowForm(prev => !prev);
  };

  const RenderCreate = CreateComponent || Create;

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);  
      setShowForm(false);    
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className={`toggle-create ${containerClassName}`}>
      {(showButtonWhenFormShown || !showForm) && (
        <button
          onClick={handleToggle}
          className={`create-toggle-btn ${buttonClassName}`}
          aria-expanded={showForm}
          aria-controls="create-form"
          type="button"
        >
          {ButtonIcon && <ButtonIcon className="button-icon" aria-hidden="true" />}
          {showForm
            ? t('button.hideCreate')
            : buttonLabel || t('button.create')}
        </button>
      )}

      {showForm && (
        <div id="create-form" className="create-form-wrapper" role="region" aria-live="polite">
          <RenderCreate title={title} fields={fields} onSubmit={handleSubmit} />
        </div>
      )}
    </div>
  );
};


export default ToggleCreateButton;
