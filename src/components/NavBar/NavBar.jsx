// src/components/NavBar/NavBar.jsx
import React from 'react';
import { useI18n } from '../../contexts/I18nContext';
import Title from '../Title/Title';
import NavLinks from './../NavLink/NavLink';
import './NavBar.scss';
import Logo from '../Logo/Logo';

import { faHome,faPaintBrush, faTags, faCog } from '@fortawesome/free-solid-svg-icons';
import linksConfig from '../../configs/linksConfig';

const NavBar = ({ onLogout }) => {
  const { t } = useI18n();

  const links = linksConfig(t);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <Title 
          text={t('dashboard.adminTitle')} 
          fontSize="3rem" 
          color="#ee0979" 
          fontWeight="900" 
          fontStyle="italic"
          textTransform="uppercase"
          className="my-custom-class"
          style={{ letterSpacing: '2px', marginBottom: '1rem' }}
        /> */}
        <Logo />
      </div>
      <NavLinks links={links} onLogout={onLogout} />
    </nav>
  );
};

export default NavBar;
