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
    const brandService = new BrandService();
    const categoryService = new CategoryService();

    brandService.getAll()
      .then(data => {
        const options = data.map(b => ({ value: b.id.toString(), label: b.name }));
        setBrands(options);
      })
      .catch(console.error);

    categoryService.getAll()
      .then(data => {
        const options = data.map(c => ({ value: c.id.toString(), label: c.name }));
        setCategories(options);
      })
      .catch(console.error);

  }, []);

  const defaultFields = [
    { name: 'name', label: 'Product Name', type: 'text' },
    { name: 'code', label: 'Product Code', type: 'text' },
    { 
      name: 'brand_id', 
      label: 'Brand', 
      type: 'select',
      options: brands,
    },
    { 
      name: 'category_id', 
      label: 'Category', 
      type: 'select',
      options: categories,
    },
    { name: 'color_code', label: 'Color Code', type: 'text' },
    { name: 'color_name', label: 'Color Name', type: 'text' },
    { name: 'hex_color', label: 'Hex Color', type: 'text' },
    { name: 'finish_type', label: 'Finish Type', type: 'text' },
    { name: 'volume_ml', label: 'Volume (ml)', type: 'number' },
    { name: 'dry_time_seconds', label: 'Dry Time (seconds)', type: 'number' },
    { name: 'durability_days', label: 'Durability (days)', type: 'number' },
    { name: 'is_vegan', label: 'Is Vegan', type: 'checkbox' },
    { name: 'is_cruelty_free', label: 'Is Cruelty Free', type: 'checkbox' },
    { name: 'is_toxic_free', label: 'Is Toxic Free', type: 'checkbox' },
    { name: 'price_vnd', label: 'Price (VND)', type: 'number' },
    { name: 'currency', label: 'Currency', type: 'text' },
    { name: 'manufacture_date', label: 'Manufacture Date', type: 'date' },
    { name: 'expiry_date', label: 'Expiry Date', type: 'date' },
    { name: 'barcode', label: 'Barcode', type: 'text' },
    { name: 'usage_instructions', label: 'Usage Instructions', type: 'textarea' },
    { name: 'warning_notes', label: 'Warning Notes', type: 'textarea' },
    { name: 'storage_instructions', label: 'Storage Instructions', type: 'textarea' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  };

  const handleSubmit = (data) => {
      console.log('Submit data:', data);
      setPopupMessage('Nail Polish saved successfully!');
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
          title="Nail Polish"
          fields={defaultFields}
          onSubmit={handleSubmit}
        />

        {/* Popup hiển thị khi popupOpen = true */}
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
