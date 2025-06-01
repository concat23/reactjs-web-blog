// src/components/NavBar/NavLinks.jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../pages/Logout/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../contexts/AuthContext'; // ✅ Đảm bảo bạn đã có file này
import UserAvatar from '../UserAvatar/UserAvatar'; // ✅ Đường dẫn đúng đến UserAvatar
import './NavLink.scss';

function NavLinks({ links = [], onLogout }) {
  const { user } = useContext(AuthContext); // ✅ Lấy user từ context

  return (
    <ul className="navbar-links">
      <li className="user-avatar-container">
        <UserAvatar user={user} />
      </li>

      {links.map(({ to, label, icon }, index) => (
        <li key={index}>
          <NavLink to={to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {icon && <FontAwesomeIcon icon={icon} className="nav-icon" />}
            <span className="labelNav">{label}</span>
          </NavLink>
        </li>
      ))}

      <li>
        <LogoutButton onClick={onLogout} className="btn-logout" />
      </li>
    </ul>
  );
}

export default NavLinks;
