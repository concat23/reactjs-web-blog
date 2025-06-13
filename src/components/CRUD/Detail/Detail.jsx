import React from 'react';
import './Detail.scss';
import { useI18n } from '../../../contexts/I18nContext';

const Detail = ({ title,item, onClose, fields }) => {
  const { t } = useI18n();

  if (!item) return null;

  const isImageFile = (url = '') =>
    /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i.test(url);

  const isVideoFile = (url = '') =>
    /\.(mp4|webm|ogg)$/i.test(url);

  const isPdfFile = (url = '') =>
    /\.pdf$/i.test(url);

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="detail-close"
          onClick={onClose}
          aria-label={t('detail.closeButton')}
        >
          ×
        </button>
        <h2 className="detail-title">{t(title)}</h2>

        <table className="detail-table" role="table" aria-label={t('detail.title')}>
          <tbody>
            {fields.map(({ name, label, options }) => {
              const value = item[name];
              let displayValue = '';

              if (options && Array.isArray(options)) {
                const matched = options.find(
                  (opt) =>
                    opt.value === value || String(opt.value) === String(value)
                );
                displayValue = matched ? matched.label : value?.toString() || '';
              } else if (typeof value === 'object' && value !== null) {
                displayValue = JSON.stringify(value, null, 2);
              } else {
                displayValue = value?.toString() || '';
              }

              return (
                <tr key={name}>
                  <td className="detail-label">{t(label)}</td>
                  <td className="detail-value">
                    {name === 'url' && isImageFile(displayValue) ? (
                      <div className="media-preview-wrapper">
                        <img
                          src={displayValue}
                          alt={item.original_name || 'media'}
                          className="media-image-preview"
                        />
                      </div>
                    ) : name === 'url' && isVideoFile(displayValue) ? (
                      <div className="media-preview-wrapper">
                        <video
                          controls
                          src={displayValue}
                          className="media-video-preview"
                        />
                      </div>
                    ) : name === 'url' && isPdfFile(displayValue) ? (
                      <a
                        href={displayValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="media-link"
                      >
                        📄 {t('detail.viewPdf') || 'Xem PDF'}
                      </a>
                    ) : name === 'url' ? (
                      <a
                        href={displayValue}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="media-link"
                      >
                        {displayValue}
                      </a>
                    ) : (
                      displayValue
                    )}
                  </td>
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
