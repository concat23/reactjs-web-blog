// src/pages/admin/NailPolishBottle.jsx
import React, { useContext } from 'react';
import Container from '../../components/Container/Container';

import { AuthContext } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import './NailPolishBottle.scss'; // Assuming you have styles for this component


const NailPolishBottle = () => {
  const auth = useContext(AuthContext);
  const { t } = useI18n();

  const handleLogout = () => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  };

  return (
    <Container widthVariant="width-80" heightVariant="height-auto" className="dashboard-container">
      <DashboardHeader onLogout={handleLogout} />
      <div id="content-wrapper" class="mt-6 px-4">
        <h1 id="page-title" class="text-2xl font-bold text-gray-800">
          {t('dashboard.nailPolishTitle')}
        </h1>
        <p id="page-description" class="text-gray-600 mt-2">
          {t('dashboard.nailPolishDescription')}
        </p>
      </div>
    </Container>
  );
};

export default NailPolishBottle;
