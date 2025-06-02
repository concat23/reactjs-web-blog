// src/pages/Dashboard/DashboardHeader.jsx
import NavBar from '../../../components/NavBar/NavBar';
import Title from '../../../components/Title/Title';
import './DashboardHeader.scss';
import { useI18n } from '../../../contexts/I18nContext'
import Clock from '../../../components/Clock/Clock';

const DashboardHeader = () => {
    const { t } = useI18n();
  return (
    <header className="dashboard-header">
      <div className="header-top">
        <Title text={t('dashboard.adminTitle')} />
        <Clock language="en" />
      </div>
      <NavBar />

    </header>
  );
};

export default DashboardHeader;
