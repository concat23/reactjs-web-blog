import React, { createContext, useContext, useState } from 'react';
import translations from '../translations'; // <- phải import cái này

const I18nContext = createContext();

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('vi');

  const t = (key) => {
    const keys = key.split('.');
    let text = translations[language];
    keys.forEach(k => {
      text = text ? text[k] : null;
    });
    return text || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
