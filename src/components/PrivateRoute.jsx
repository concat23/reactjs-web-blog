import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

class PrivateRoute extends Component {
  static contextType = AuthContext;

  render() {
    const { isAuthenticated } = this.context;
    const { children } = this.props;
    if (isAuthenticated) {
      return children;
    }
    return <Navigate to="/login" replace />;
  }
}

export default PrivateRoute;
