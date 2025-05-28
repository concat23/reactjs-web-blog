// src/pages/Logout/Logout.jsx
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

export default function Logout() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear token or login data
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    // Redirect to login
    navigate('/login');
  }, [setIsAuthenticated, navigate]);

  return null; // or <div>Logging out...</div> if you prefer
}
