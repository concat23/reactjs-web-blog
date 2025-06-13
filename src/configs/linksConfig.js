// src/config/linksConfig.js

import {
  faHome,
  faTags,
  faPaintBrush,
  faCog,
  faImages,
} from '@fortawesome/free-solid-svg-icons';

/**
 * @param {Function} t - i18n translate function
 * @returns {Array} Navigation link configuration
 */
const linksConfig = (t) => [
  { to: '/dashboard', label: t('dashboard.adminTitle'), icon: faHome },
  { to: '/category', label: t('item.categories'), icon: faTags },
  { to: '/brand', label: t('item.brand'), icon: faTags },
  { to: '/nail-polish-bottle', label: t('item.nailPolishBottle'), icon: faPaintBrush },
  { to: '/media', label: t('item.media'), icon: faImages }, // dùng icon phù hợp hơn
  { to: '/settings', label: t('item.settings'), icon: faCog },
];

export default linksConfig;
