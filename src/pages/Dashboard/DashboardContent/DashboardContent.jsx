// src/pages/Dashboard/DashboardContent.jsx
import React from 'react';
import ProgressBar from '../../../components/ProcessBar/ProcessBar';
import Container from '../../../components/Container/Container';
import { useI18n } from '../../../contexts/I18nContext'

const DashboardContent = ({ progressData }) => {
  const { progress, status, step } = progressData;
  const { t } = useI18n();


  return (
    <main className="dashboard-content">
      {progress < 100 ? (
        <ProgressBar
          progress={progress}
          status={status}
          step={step === t('dashboard.progressStepComplete') ? '' : step}
        />
      ) : (
        <Container widthVariant="width-full" heightVariant="height-auto" className="dashboard-container">
             <p>{t('dashboard.welcome')}</p>
        </Container>
       
      )}
    </main>
  );
};

export default DashboardContent;
