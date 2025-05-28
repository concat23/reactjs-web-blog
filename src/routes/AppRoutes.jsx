import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import { AuthContext } from '../contexts/AuthContext';

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

          {/* Trang chính sau khi đăng nhập */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Các đường dẫn khác như /admin/something đều load Dashboard nếu login */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
