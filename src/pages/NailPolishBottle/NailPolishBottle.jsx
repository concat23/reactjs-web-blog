import React, { useContext, useState, useEffect } from 'react';
import Container from '../../components/Container/Container';

import { AuthContext } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import './NailPolishBottle.scss';

import Create from '../../components/CRUD/Create/Create';
import Popup from '../../components/Popup/Popup';

import BrandService from '../../api/BrandService';
import CategoryService from '../../api/CategoryService';

const NailPolishBottle = () => {
  const auth = useContext(AuthContext);
  const { t } = useI18n();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {

    document.title = t('item.nailPolishBottleTitle');

    const brandService = new BrandService();
    const categoryService = new CategoryService();

    brandService.getAll()
      .then(item => {
        const options = item.data.map(b => ({ value: b.id.toString(), label: b.name }));
        setBrands(options);
      })
      .catch(console.error);

    categoryService.getAll()
      .then(item => {
        const options = item.data.map(c => ({ value: c.id.toString(), label: c.name }));
        setCategories(options);
      })
      .catch(console.error);

  }, []);

  // Chuyển ngữ label fields
  const defaultFields = [
    { name: 'name', label: t('nailPolish.productName'), type: 'text' },
    { name: 'code', label: t('nailPolish.productCode'), type: 'text' },
    { 
      name: 'brand_id', 
      label: t('nailPolish.brand'), 
      type: 'select',
      options: brands,
    },
    { 
      name: 'category_id', 
      label: t('nailPolish.category'), 
      type: 'select',
      options: categories,
    },
    { name: 'color_code', label: t('nailPolish.colorCode'), type: 'text' },
    { name: 'color_name', label: t('nailPolish.colorName'), type: 'text' },
    { name: 'hex_color', label: t('nailPolish.hexColor'), type: 'text' },
    { name: 'finish_type', label: t('nailPolish.finishType'), type: 'text' },
    { name: 'volume_ml', label: t('nailPolish.volumeMl'), type: 'number' },
    { name: 'dry_time_seconds', label: t('nailPolish.dryTimeSeconds'), type: 'number' },
    { name: 'durability_days', label: t('nailPolish.durabilityDays'), type: 'number' },
    { name: 'is_vegan', label: t('nailPolish.isVegan'), type: 'checkbox' },
    { name: 'is_cruelty_free', label: t('nailPolish.isCrueltyFree'), type: 'checkbox' },
    { name: 'is_toxic_free', label: t('nailPolish.isToxicFree'), type: 'checkbox' },
    { name: 'price_vnd', label: t('nailPolish.priceVnd'), type: 'number' },
    { name: 'currency', label: t('nailPolish.currency'), type: 'text' },
    { name: 'manufacture_date', label: t('nailPolish.manufactureDate'), type: 'date' },
    { name: 'expiry_date', label: t('nailPolish.expiryDate'), type: 'date' },
    { name: 'barcode', label: t('nailPolish.barcode'), type: 'text' },
    { name: 'usage_instructions', label: t('nailPolish.usageInstructions'), type: 'textarea' },
    { name: 'warning_notes', label: t('nailPolish.warningNotes'), type: 'textarea' },
    { name: 'storage_instructions', label: t('nailPolish.storageInstructions'), type: 'textarea' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  };

  const handleSubmit = (data) => {
      console.log('Submit data:', data);
      setPopupMessage(t('nailPolish.saveSuccessMessage'));
      setPopupOpen(true);
  };

  return (
    <Container widthVariant="width-80" heightVariant="height-auto" className="dashboard-container">
      <DashboardHeader onLogout={handleLogout} />
      <div id="content-wrapper" className="mt-6 px-4">
        <h1 id="page-title" className="text-2xl font-bold text-gray-800">
          {t('dashboard.nailPolishTitle')}
        </h1>
        <p id="page-description" className="text-gray-600 mt-2">
          {t('dashboard.nailPolishDescription')}
        </p>

        <Create
          title={t('nailPolish.formTitle')}
          fields={defaultFields}
          onSubmit={handleSubmit}
        />

        <Popup
          isOpen={popupOpen}
          message={popupMessage}
          onClose={() => setPopupOpen(false)}
        />
      </div>
    </Container>
  );
};

export default NailPolishBottle;
