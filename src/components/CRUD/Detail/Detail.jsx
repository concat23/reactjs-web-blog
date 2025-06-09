import React from 'react';
import './Detail.scss';
import { useI18n } from '../../../contexts/I18nContext';

const Detail = ({ item, onClose, fields }) => {
  const { t } = useI18n();

  if (!item) return null;

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-card" onClick={e => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose} aria-label={t('detail.closeButton')}>×</button>
        <h2 className="detail-title">{t('detail.title')}</h2>

        <table className="detail-table" role="table" aria-label={t('detail.title')}>
          <tbody>
            {fields.map(({ name, label, options }) => {
              const value = item[name];
              let displayValue = '';

              if (options && Array.isArray(options)) {
                // Tìm option khớp với value, hỗ trợ cả string, number, boolean
                const matched = options.find(opt => {
                  // So sánh strict với kiểu tương ứng, chuyển value thành string nếu opt.value là string
                  return opt.value === value || String(opt.value) === String(value);
                });
                displayValue = matched ? matched.label : value?.toString() || '';
              } else if (typeof value === 'object' && value !== null) {
                // Nếu value là object thì stringify (có thể tùy chỉnh thêm nếu cần)
                displayValue = JSON.stringify(value, null, 2);
              } else {
                displayValue = value?.toString() || '';
              }

              return (
                <tr key={name}>
                  <td className="detail-label">{t(label)}</td>
                  <td className="detail-value">{displayValue}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Detail;
