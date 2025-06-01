import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import Layout from './layout/Layout';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthService from './services/auth.service';

function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'vi' : 'en');
  };

  return (
    <button onClick={toggleLanguage} style={{ position: 'absolute', top: 10, right: 10 }}>
      {language === 'en' ? 'VI' : 'EN'}
    </button>
  );
}

function AnimatedRoutes({ isLoggedIn, onLogin, onLogout }) {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<Layout />}>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={onLogin} />}
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard onLogout={onLogout} /> : <Navigate to="/login" />}
        />
      </Route>

      <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
    </Routes>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());

  const handleLogin = async (email, password) => {
    try {
      const token = await AuthService.login(email, password);
      if (token) setIsLoggedIn(true);
      return true;
    } catch {
      return false;
    }
  };

  const handleLogout = async () => {
    await AuthService.logout();
    setIsLoggedIn(false);
  };

  return (
      <Router>
        <LanguageSwitcher />
        <AnimatedRoutes isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />

      </Router>
  );
}

export default App;
