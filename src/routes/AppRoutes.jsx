import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import NailPolishBottle from '../pages/NailPolishBottle/NailPolishBottle';
import NotFound from '../pages/Error/NotFound/NotFound'; // ✅ Import trang NotFound

import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import { AuthContext } from '../contexts/AuthContext';
import Error505 from '../pages/Error/Error505/Error505';
import Category from '../pages/Category/Category';

class AdminRootRedirect extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated } = this.context;
    return isAuthenticated ? (
      <Navigate to="/dashboard" replace />
    ) : (
      <Navigate to="/login" replace />
    );
  }
}

class AppRoutes extends Component {
  render() {
    return (
      <BrowserRouter basename="/admin">
        <Routes>
          {/* Truy cập /admin → chuyển hướng theo trạng thái đăng nhập */}
          <Route path="/" element={<AdminRootRedirect />} />

          {/* Đăng nhập */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Trang chính sau đăng nhập */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/nail-polish-bottle"
            element={
              <PrivateRoute>
                <NailPolishBottle />
              </PrivateRoute>
            }
          />

           <Route
            path="/category"
            element={
              <PrivateRoute>
                <Category />
              </PrivateRoute>
            }
          />

          {/* ✅ Bắt mọi route không khớp */}
           <Route path="/error/505" element={<Error505 />} />
          <Route path="*" element={<NotFound />} />
         
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
