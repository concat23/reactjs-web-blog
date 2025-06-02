import React, { useContext, useState, useEffect } from 'react';
import Container from '../../components/Container/Container';

import { AuthContext } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import './Category.scss';

import Create from '../../components/CRUD/Create/Create';
import List from '../../components/CRUD/List/List';
import Popup from '../../components/Popup/Popup';
import Group from '../../components/Group/Group';

import CategoryService from '../../api/CategoryService';

const Category = () => {
  const auth = useContext(AuthContext);
  const { t } = useI18n();
  const service = new CategoryService(); 

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [refreshFlag, setRefreshFlag] = useState(0);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await service.getAll();
      setCategories(response || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setPopupMessage(t('category.errorFetch'));
      setPopupOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const defaultFields = [
    { name: 'name', label: t('category.name'), type: 'text', required: true },
    { name: 'description', label: t('category.description'), type: 'textarea' }
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  };

  const handleSubmit = async (data) => {
    try {
      await service.create(data); 
      setPopupMessage(t('category.successMessage'));
      setPopupOpen(true);
      setRefreshFlag((prev) => prev + 1);
      fetchCategories(); // Refresh list
    } catch (error) {
      console.error('Error creating category:', error);
      setPopupMessage(t('category.errorMessage'));
      setPopupOpen(true);
    }
  };

  return (
    <Container widthVariant="width-80" heightVariant="height-auto" className="dashboard-container">
      <DashboardHeader onLogout={handleLogout} />
      <div id="content-wrapper" className="mt-6 px-4">
        <h1 id="page-title" className="text-2xl font-bold text-gray-800">
          {t('dashboard.categoryTitle')}
        </h1>
        <p id="page-description" className="text-gray-600 mt-2">
          {t('dashboard.categoryDescription')}
        </p>

        <Group>
          <Create
            title={t('category.createTitle')}
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
          title={t('category.listTitle')}
          refreshTrigger={refreshFlag}
          loading={loading}
        />
      </div>
    </Container>
  );
};

export default Category;
