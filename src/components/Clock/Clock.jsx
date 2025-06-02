import React, { useEffect, useState } from 'react';
import './Clock.scss';
import { useI18n } from '../../contexts/I18nContext';

const Clock = ({ language: propLanguage }) => {
  const { t, language: contextLanguage } = useI18n();
  const language = propLanguage || contextLanguage; 

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    document.title = t('item.clockTitle');
  }, [language, t]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const locale = language === 'vi' ? 'vi-VN' : 'en-US';
    return date.toLocaleTimeString(locale, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: language === 'vi' ? false : true,
      timeZone: 'Asia/Ho_Chi_Minh',
      localeMatcher: 'lookup',
    });
  };

  const formatDate = (date) => {
    const locale = language === 'vi' ? 'vi-VN' : 'en-US';
    return date.toLocaleDateString(locale, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Ho_Chi_Minh',
      localeMatcher: 'lookup',
    });
  };

  return (
    <div className="clock-container">
      <div className="clock-time">{formatTime(time)}</div>
      <div className="clock-date">{formatDate(time)}</div>
    </div>
  );
};

export default Clock;
