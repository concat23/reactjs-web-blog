import React, { useEffect, useState } from 'react';
import './List.scss';
import { useI18n } from '../../../contexts/I18nContext';

const SkeletonRow = ({ fields }) => {
  return (
    <tr className="entity-list__tr skeleton-row">
      {fields.map((field, index) => (
        <td key={index} className="entity-list__td">
          <div className="skeleton-box" />
        </td>
      ))}
      {/* Thêm ô trống cho action */}
      <td className="entity-list__td">
        <div className="skeleton-box" />
      </td>
    </tr>
  );
};

const List = ({
  service,
  title = 'Entity List',
  refreshTrigger,
  onView,
  onEdit,
  onDelete,
}) => {
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

      if (dataItems.length > 0) {
        setFields(Object.keys(dataItems[0]));
      } else {
        setFields([]);
      }
    } catch (error) {
      setMessage('Failed to load data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [service, refreshTrigger]);

  const skeletonCount = 5;

  // Hàm xác nhận xoá trước khi gọi onDelete
  const handleDelete = (item) => {
    if (window.confirm(t('confirm.delete'))) {
      onDelete && onDelete(item);
    }
  };

  return (
    <div className="entity-list" id="entity-list">
      <h2 className="entity-list__title" id="entity-list-title">
        {title}
      </h2>

      {message && (
        <p className="entity-list__message entity-list__message--error">
          {message}
        </p>
      )}

      {loading ? (
        <div className="entity-list__table-wrapper">
          <table className="entity-list__table" role="table">
            <thead>
              <tr>
                {(fields.length > 0 ? fields : new Array(5).fill('')).map(
                  (field, index) => (
                    <th key={index} className="entity-list__th">
                      {field || ''}
                    </th>
                  )
                )}
                <th className="entity-list__th">{t('actions')}</th>
              </tr>
            </thead>
            <tbody>
              {new Array(skeletonCount).fill(0).map((_, idx) => (
                <SkeletonRow
                  key={idx}
                  fields={fields.length > 0 ? fields : new Array(5).fill('')}
                />
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
                  <th key={field} className="entity-list__th">
                    {field}
                  </th>
                ))}
                <th className="entity-list__th">{t('actions')}</th>
              </tr>
            </thead>
           <tbody>
              {items.map((item, rowIndex) => (
                <tr key={item.id || rowIndex} className="entity-list__tr">
                  {fields.map((field) => (
                    <td key={field} className="entity-list__td">
                      {(() => {
                        const value = item[field];
                        if (field === 'logo_url') {
                          return (
                            <img
                              src={value}
                              alt={`${item.name || 'logo'} logo`}
                              style={{ height: '40px' }}
                            />
                          );
                        }
                        if (field === 'website') {
                          return (
                            <a href={value} target="_blank" rel="noopener noreferrer">
                              {value}
                            </a>
                          );
                        }
                        // Nếu là object thì stringify, ngược lại hiển thị text
                        return typeof value === 'object'
                          ? JSON.stringify(value)
                          : value?.toString();
                      })()}
                    </td>
                  ))}
                  <td className="entity-list__td actions">
                    <button
                      aria-label={t('view')}
                      className="btn-action view"
                      onClick={() => onView && onView(item)}
                      type="button"
                    >
                      👁️
                    </button>
                    <button
                      aria-label={t('edit')}
                      className="btn-action edit"
                      onClick={() => onEdit && onEdit(item)}
                      type="button"
                    >
                      ✏️
                    </button>
                    <button
                      aria-label={t('delete')}
                      className="btn-action delete"
                      onClick={() => handleDelete(item)}
                      type="button"
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
