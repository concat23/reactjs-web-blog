import React, { useContext, useState, useEffect, useCallback } from 'react';
import Container from '../../components/Container/Container';

import { AuthContext } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';
import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import './NailPolishBottle.scss';

import Popup from '../../components/Popup/Popup';

import BrandService from '../../api/BrandService';
import CategoryService from '../../api/CategoryService';
import NailPolishProductService from '../../api/NailPolishProductService';
import List from '../../components/CRUD/List/List';
import ToggleCreateButton from '../../components/ToggleCreateButton/ToggleCreateButton';
import Create from '../../components/CRUD/Create/Create';
import nailPolishFieldsConfig from '../../configs/nailPolishFieldsConfig';
import Detail from '../../components/CRUD/Detail/Detail';

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

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);


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

  const defaultFields = nailPolishFieldsConfig(t, brands, categories);
  
  
const booleanOptions = [
  { value: true, label: 'Có' },
  { value: false, label: 'Không' },
  { value: 1, label: 'Có' },
  { value: 0, label: 'Không' },
];

const optionsMap = {
  brand_id: brands,
  category_id: categories,
  is_vegan: booleanOptions,
  is_cruelty_free: booleanOptions,
  is_toxic_free: booleanOptions,
};

const fields = defaultFields.map(field => 
  field.name in optionsMap 
    ? { ...field, options: optionsMap[field.name] }
    : field
);


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
      const createdProduct = await productService.create(fixedData);


      if (selectedImages.length > 0) {
        await productService.uploadImages(createdProduct.data.id, selectedImages);
      }

      setPopupMessage(t('nailPolish.saveSuccessMessage'));
      setPopupOpen(true);
      setSelectedImages([]);
      setRefreshFlag(prev => prev + 1); 
    } catch (error) {
      console.error('Error saving or uploading product:', error);
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

       <ToggleCreateButton
          title={t('brand.createTitle')}
          fields={defaultFields}
          onSubmit={handleSubmit}
          buttonLabel={t('button.create')}
          Create={Create}
          disableToggleOff={true}
        />

        <Detail title="nailPolish.detail.title" item={selectedItem} onClose={() => setSelectedItem(null)} fields={fields} service={productService} />
        
        <Popup isOpen={popupOpen} message={popupMessage} onClose={() => setPopupOpen(false)} />

        <List service={productService} title={t('nailPolish.listTitle')} refreshTrigger={refreshFlag} loading={loading}  onView={(item) => setSelectedItem(item)} />
      </div>
    </Container>
  );
};

export default NailPolishBottle;
