import React, { useContext, useState, useEffect, useCallback } from 'react';
import Container from '../../components/Container/Container';

import { AuthContext } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import './NailPolishBottle.scss';

import Create from '../../components/CRUD/Create/Create';
import Popup from '../../components/Popup/Popup';

import BrandService from '../../api/BrandService';
import CategoryService from '../../api/CategoryService';
import NailPolishProductService from '../../api/NailPolishProductService';
import List from '../../components/CRUD/List/List';

const NailPolishBottle = () => {
  const auth = useContext(AuthContext);
  const { t } = useI18n();

  // State cho options
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // State popup & loading
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Trigger refresh list khi tạo mới thành công
  const [refreshFlag, setRefreshFlag] = useState(0);

  // Khởi tạo service chỉ 1 lần
  const brandService = React.useMemo(() => new BrandService(), []);
  const categoryService = React.useMemo(() => new CategoryService(), []);
  const productService = React.useMemo(() => new NailPolishProductService(), []);

  // Load brands, categories khi component mount
  useEffect(() => {
    document.title = t('item.nailPolishBottleTitle');

    setLoading(true);
    Promise.all([
      brandService.getAll(),
      categoryService.getAll(),
      productService.getAll(), // nếu bạn dùng dữ liệu này để show list thì xử lý setState ở đây
    ])
      .then(([brandRes, categoryRes]) => {
        const brandOptions = brandRes.data.map(b => ({ value: b.id.toString(), label: b.name }));
        const categoryOptions = categoryRes.data.map(c => ({ value: c.id.toString(), label: c.name }));
        setBrands(brandOptions);
        setCategories(categoryOptions);
      })
      .catch(error => {
        console.error('Error loading brands or categories:', error);
        setPopupMessage(t('nailPolish.loadErrorMessage') || 'Lỗi tải dữ liệu. Vui lòng thử lại.');
        setPopupOpen(true);
      })
      .finally(() => setLoading(false));
  }, [brandService, categoryService, productService, t]);

  // Các trường form, sử dụng dữ liệu options lấy được
  const defaultFields = [
    { name: 'name', label: t('nailPolish.productName'), type: 'text' },
    { name: 'code', label: t('nailPolish.productCode'), type: 'text' },
    { name: 'brand_id', label: t('nailPolish.brand'), type: 'select', options: brands },
    { name: 'category_id', label: t('nailPolish.category'), type: 'select', options: categories },
    { name: 'color_code', label: t('nailPolish.colorCode'), type: 'text' },
    { name: 'color_name', label: t('nailPolish.colorName'), type: 'text' },
    { name: 'hex_color', label: t('nailPolish.hexColor'), type: 'text' },
    {
      name: 'finish_type',
      label: t('nailPolish.finishType'),
      type: 'select',
      options: [
        { value: 'shiny', label: 'Shiny' },
        { value: 'matte', label: 'Matte' },
        { value: 'glitter', label: 'Glitter' },
      ],
    },
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

  // Đăng xuất
  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  }, [auth]);

  // Xử lý submit tạo mới
  const handleSubmit = async (data) => {
    const fixedData = {
      ...data,
      category_id: Number(data.category_id),
      brand_id: Number(data.brand_id),
    };

    try {
      await productService.create(fixedData);
      setPopupMessage(t('nailPolish.saveSuccessMessage'));
      setPopupOpen(true);
      setRefreshFlag(prev => prev + 1); // kích hoạt refresh list
    } catch (error) {
      console.error('Error saving product:', error);
      setPopupMessage(t('nailPolish.saveErrorMessage') || 'Lưu thất bại. Vui lòng thử lại.');
      setPopupOpen(true);
    }
  };

  return (
    <Container widthVariant="width-80" heightVariant="height-auto" className="dashboard-container">
      <DashboardHeader onLogout={handleLogout} />

      <div id="content-wrapper" className="mt-6 px-4">
        <h1 id="page-title" className="text-2xl font-bold text-gray-800">{t('dashboard.nailPolishTitle')}</h1>
        <p id="page-description" className="text-gray-600 mt-2">{t('dashboard.nailPolishDescription')}</p>

        <Create title={t('nailPolish.formTitle')} fields={defaultFields} onSubmit={handleSubmit} />

        <Popup isOpen={popupOpen} message={popupMessage} onClose={() => setPopupOpen(false)} />

        <List service={productService} title={t('nailPolish.listTitle')} refreshTrigger={refreshFlag} loading={loading} />
      </div>
    </Container>
  );
};

export default NailPolishBottle;
