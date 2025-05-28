// src/App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import AuthService from './services/auth.service';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(AuthService.isAuthenticated());

  const handleLogin = async (email, password) => {
    try {
      const token = await AuthService.login(email, password);
      if (token) setIsLoggedIn(true);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
    } finally {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    setIsLoggedIn(AuthService.isAuthenticated());
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
          }
        />
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
