import React, { useEffect, useState } from 'react';
import './List.scss';
import { useI18n } from '../../../contexts/I18nContext';

const SkeletonRow = ({ fields }) => (
  <tr className="entity-list__tr skeleton-row">
    {fields.map((_, index) => (
      <td key={index} className="entity-list__td">
        <div className="skeleton-box" />
      </td>
    ))}
    <td className="entity-list__td">
      <div className="skeleton-box" />
    </td>
  </tr>
);

const List = ({ service, title = 'Entity List', refreshTrigger, onView, onEdit, onDelete }) => {
  const [items, setItems] = useState([]);
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();
 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setMessage('');
      try {
        const data = await service.getAll();
        const dataItems = data?.data || [];
        setItems(dataItems);
        setFields(dataItems.length > 0 ? Object.keys(dataItems[0]) : []);
      } catch (error) {
        setMessage('Failed to load data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [service, refreshTrigger]);

  const skeletonCount = 5;

  const handleDelete = (item) => {
    if (window.confirm(t('confirm.delete'))) {
      onDelete && onDelete(item);
    }
  };

  const renderValue = (field, value) => {
    if (field === 'logo_url' || (typeof value === 'string' && /\.(jpe?g|png|gif|webp|svg)$/i.test(value))) {
      return (
        <div>
          <img src={value} alt="preview" style={{ maxHeight: '40px', marginBottom: '4px' }} />
          <br />
          <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
        </div>
      );
    }

    if (typeof value === 'string' && value.startsWith('http')) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      );
    }

    return typeof value === 'object' ? JSON.stringify(value) : value?.toString();
  };

  return (
    <div className="entity-list" id="entity-list">
      <h2 className="entity-list__title">{title}</h2>

      {message && <p className="entity-list__message entity-list__message--error">{message}</p>}

      {loading ? (
        <div className="entity-list__table-wrapper">
          <table className="entity-list__table" role="table">
            <thead>
              <tr>
                {(fields.length > 0 ? fields : new Array(5).fill({ label: '' })).map((field, index) => (
                  <th key={index} className="entity-list__th">{field.label ? t(field.label) : ''}</th>
                ))}
                <th className="entity-list__th">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: skeletonCount }).map((_, idx) => (
                <SkeletonRow key={idx} fields={fields.length > 0 ? fields : new Array(5).fill('')} />
              ))}
            </tbody>
          </table>
        </div>
      ) : items.length > 0 ? (
        <div className="entity-list__table-wrapper">
          <table className="entity-list__table" role="table">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field} className="entity-list__th">{field}</th>
                ))}
                <th className="entity-list__th">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, rowIndex) => (
                <tr key={item.id || rowIndex} className="entity-list__tr">
                  {fields.map((field) => (
                    <td key={field} className="entity-list__td">
                      {renderValue(field, item[field])}
                    </td>
                  ))}
                  <td className="entity-list__td actions">
                    <button
                      aria-label={t('view')}
                      className="btn-action view"
                      onClick={() => onView && onView(item)}
                    >
                      👁️
                    </button>
                    <button
                      aria-label={t('edit')}
                      className="btn-action edit"
                      onClick={() => onEdit && onEdit(item)}
                    >
                      ✏️
                    </button>
                    <button
                      aria-label={t('delete')}
                      className="btn-action delete"
                      onClick={() => handleDelete(item)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="entity-list__message">{t('notfound.records')}</p>
      )}
    </div>
  );
};

export default List;
