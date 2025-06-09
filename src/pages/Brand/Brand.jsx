import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import Container from '../../components/Container/Container';

import { AuthContext } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import './Brand.scss';

import Create from '../../components/CRUD/Create/Create';
import List from '../../components/CRUD/List/List';
import Popup from '../../components/Popup/Popup';
import Group from '../../components/Group/Group';

import BrandService from '../../api/BrandService';

const Brand = () => {
  const auth = useContext(AuthContext);
  const { t } = useI18n();

  // Tạo service 1 lần, tránh tạo lại mỗi render
  const service = useMemo(() => new BrandService(), []);

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    document.title = t('item.brandTitle');
    fetchBrands();
  }, [t, refreshFlag]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const response = await service.getAll();
      setBrands(response?.data || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setPopupMessage(t('brand.errorFetch') || 'Lỗi tải thương hiệu');
      setPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const defaultFields = [
    { name: 'id', label: t('brand.id'), type: 'text', readOnly: true },
    { name: 'name', label: t('brand.name'), type: 'text', required: true },
    { name: 'country', label: t('brand.country'), type: 'text' },
    { name: 'website', label: t('brand.website'), type: 'text' },
    { name: 'logo_url', label: t('brand.logo'), type: 'text' },
  ];

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  }, [auth]);

  const handleSubmit = async (data) => {
    try {
      await service.create(data);
      setPopupMessage(t('brand.successMessage') || 'Tạo mới thành công');
      setPopupOpen(true);
      setRefreshFlag(prev => prev + 1);
    } catch (error) {
      console.error('Error creating brand:', error);
      setPopupMessage(t('brand.errorMessage') || 'Tạo mới thất bại');
      setPopupOpen(true);
    }
  };

  return (
    <Container widthVariant="width-80" heightVariant="height-auto" className="dashboard-container">
      <DashboardHeader onLogout={handleLogout} />
      <div id="content-wrapper" className="mt-6 px-4">
        <h1 id="page-title" className="text-2xl font-bold text-gray-800">
          {t('dashboard.brandTitle')}
        </h1>
        <p id="page-description" className="text-gray-600 mt-2">
          {t('dashboard.brandDescription')}
        </p>

        <Group>
          <Create
            title={t('brand.createTitle')}
            fields={defaultFields}
            onSubmit={handleSubmit}
          />
        </Group>

        <Popup
          isOpen={popupOpen}
          message={popupMessage}
          onClose={() => setPopupOpen(false)}
        />

        <List
          service={service}
          title={t('brand.listTitle')}
          refreshTrigger={refreshFlag}
          loading={loading}
        />
      </div>
    </Container>
  );
};

export default Brand;
