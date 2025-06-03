import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Container from '../../components/Container/Container';

import DashboardHeader from './DashboardHeader/DashboardHeader';
import DashboardContent from './DashboardContent/DashboardContent';
import { useI18n } from '../../contexts/I18nContext';
import TokenCountdown from '../../components/TokenCountdown/TokenCountdown';

const Dashboard = () => {
  
  const auth = useContext(AuthContext);
  const { t } = useI18n();


  const [progressData, setProgressData] = useState({
    progress: 0,
    status: 'loading',
    step: t('dashboard.progressStepStart'),
  });

  const timerRef = useRef(null);

  useEffect(() => {
     document.title = t('item.dashboardTitle');
    const fakeProgress = () => {
      timerRef.current = setTimeout(() => {
        setProgressData((prev) => {
          const nextProgress = Math.min(prev.progress + 20, 100);

          if (nextProgress >= 100) {
            sessionStorage.setItem('progressHasRun', 'true');
            return {
              progress: 100,
              status: 'success',
              step: t('dashboard.progressStepComplete'),
            };
          }

          return {
            ...prev,
            progress: nextProgress,
            step: `${t('dashboard.progressStepStart')} ${nextProgress}%`,
          };
        });

        fakeProgress(); // recurse
      }, 200);
    };

    const hasRun = sessionStorage.getItem('progressHasRun');
    if (!hasRun) {
      fakeProgress();
    } else {
      setProgressData({
        progress: 100,
        status: 'success',
        step: t('dashboard.progressStepComplete'),
      });
    }

    return () => clearTimeout(timerRef.current);
  }, [t]);

  const handleLogout = () => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  };

  return (
    <div className="dashboard">
      <Container widthVariant="width-80" heightVariant="height-auto" className="dashboard-container">
          <TokenCountdown />
        <DashboardHeader onLogout={handleLogout} />
        <DashboardContent progressData={progressData} />
      </Container>
    </div>
  );
};

export default Dashboard;
