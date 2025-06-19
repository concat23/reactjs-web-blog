import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import Container from '../../components/Container/Container';
import { AuthContext } from '../../contexts/AuthContext';
import { useI18n } from '../../contexts/I18nContext';

import DashboardHeader from '../Dashboard/DashboardHeader/DashboardHeader';
import List from '../../components/CRUD/List/List';
import Popup from '../../components/Popup/Popup';
import Group from '../../components/Group/Group';

import MediaService from '../../api/MediaService';
import './Media.scss';
import mediaDetailConfig from '../../configs/mediaDetailConfig';
import Detail from '../../components/CRUD/Detail/Detail';
import FileUploadInput from '../../components/FileUploadInput/FileUploadInput';

const Media = () => {
  const auth = useContext(AuthContext);
  const { t } = useI18n();

  const service = useMemo(() => new MediaService(), []);

  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const fields = mediaDetailConfig(t);



  useEffect(() => {
    document.title = t('item.pageTitle');
  }, [t]);

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('progressHasRun');
    auth.logout();
  }, [auth]);

  const handleFileChange = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const uploadedFiles = Array.from(files);
    const formData = new FormData();

    uploadedFiles.forEach((file) => {
      formData.append('file', file);
    });

    try {
      setLoading(true);
      await service.upload(formData);
      setPopupMessage(t('media.uploadSuccess') || 'Tải file thành công');
      setPopupOpen(true);
      setRefreshFlag((prev) => prev + 1);
    } catch (error) {
      console.error('Upload failed:', error);
      setPopupMessage(t('media.uploadError') || 'Tải file thất bại');
      setPopupOpen(true);
    } finally {
      setLoading(false);
      event.target.value = ''; // reset input
    }
  };

  return (
    <Container
      widthVariant="width-80"
      heightVariant="height-auto"
      className="dashboard-container"
    >
      <DashboardHeader onLogout={handleLogout} />

      <div id="content-wrapper" className="mt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {t('dashboard.mediaTitle')}
        </h1>
        <p className="text-gray-600 mt-2 mb-4">
          {t('dashboard.mediaDescription')}
        </p>

        <Group>
          <FileUploadInput
              label={t('media.selectFile')}
              helperText={t('media.allowedTypes')}
              onChange={handleFileChange}
            />
        </Group>

        <Detail
          title="media.detail.title"
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          fields={fields}
        />

        <Popup
          isOpen={popupOpen}
          message={popupMessage}
          onClose={() => setPopupOpen(false)}
        />

        <List
          service={service}
          title={t('media.listTitle')}
          refreshTrigger={refreshFlag}
          loading={loading}
          onView={(item) => setSelectedItem(item)} 
        />
               
      </div>
    </Container>
  );
};

export default Media;
