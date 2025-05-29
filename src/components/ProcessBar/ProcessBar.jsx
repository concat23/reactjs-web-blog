import React from 'react';
import './../ProcessBar/ProcessBar.scss';

const ProgressBar = ({
  progress = 0,
  status = 'idle', // idle, loading, success, error
  step = '',
  height = '12px',
}) => {
  const safeProgress = Math.min(100, Math.max(0, progress));
  const statusClass = `progress-bar__fill ${status}`;

  return (
    <div className="progress-bar-wrapper">
      <div className="progress-bar" style={{ height }}>
        <div
          className={statusClass}
          style={{ width: `${safeProgress}%` }}
          aria-valuenow={safeProgress}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        />
      </div>
      <div className="progress-bar__info">
        <strong>{step || 'Đang xử lý...'}</strong> — {safeProgress}%
      </div>
    </div>
  );
};

export default ProgressBar;
