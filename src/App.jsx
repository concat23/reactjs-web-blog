// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthService from './services/auth.service';
import AnimatedPage from './components/AnimatedPage';

const AnimatedRoutes = ({ isLoggedIn, onLogin, onLogout }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <AnimatedPage><Login onLogin={onLogin} /></AnimatedPage>
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <AnimatedPage><Dashboard onLogout={onLogout} /></AnimatedPage> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </AnimatePresence>
  );
};

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
      <AnimatedRoutes isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
    </Router>
  );
}

export default App;
