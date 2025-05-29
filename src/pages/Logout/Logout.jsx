import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AuthService from '../../api/AuthService';
import './../Logout/Logout.scss';

import { FiLogOut } from 'react-icons/fi';


const authService = new AuthService();

export default function LogoutButton() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authService.logout();
      authService.clearClientSession();

      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      authService.clearClientSession();
      setIsAuthenticated(false);
      navigate('/login');
    }
  };

  return (
   <button className="logout-button" onClick={handleLogout} aria-label="Logout">
    <FiLogOut size={20} />
  </button>
  );
}
