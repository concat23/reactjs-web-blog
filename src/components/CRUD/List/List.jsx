import React, { useEffect, useState } from 'react';
import './List.scss';
import { useI18n } from '../../../contexts/I18nContext';

const List = ({ service, title = 'Entity List', refreshTrigger }) => {
  const [items, setItems] = useState([]);
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState('');
  const { t } = useI18n();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getAll();
        setItems(data || []);
        if (data && data.length > 0) {
          setFields(Object.keys(data[0]));
        }
      } catch (error) {
        setMessage('Failed to load data: ' + error.message);
      }
    };

    fetchData();
  }, [service, refreshTrigger]); // ✅ add refreshTrigger

  return (
    <div className="entity-list" id="entity-list">
      <h2 className="entity-list__title" id="entity-list-title">{title}</h2>

      {message && (
        <p className="entity-list__message entity-list__message--error">
          {message}
        </p>
      )}

      {items.length > 0 ? (
        <div className="entity-list__table-wrapper">
          <table className="entity-list__table">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field} className="entity-list__th">
                    {field}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, rowIndex) => (
                <tr key={item.id || rowIndex} className="entity-list__tr">
                  {fields.map((field) => (
                    <td key={field} className="entity-list__td">
                      {typeof item[field] === 'object'
                        ? JSON.stringify(item[field])
                        : item[field]?.toString()}
                    </td>
                  ))}
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
