import React, { createContext, Component } from 'react';
import AuthService from '../api/AuthService';

export const AuthContext = createContext();

export class AuthProvider extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state = {
      isAuthenticated: this.authService.isAuthenticated(),
      loading: false,
      error: null,
    };
  }

  setIsAuthenticated = (value) => {
    this.setState({ isAuthenticated: value });
  };

  login = async (email, password) => {
    this.setState({ loading: true, error: null });
    try {
      await this.authService.login(email, password);
      this.setState({ isAuthenticated: true, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
      throw error;
    }
  };

  logout = async () => {
    this.setState({ loading: true });
    try {
      await this.authService.logout();
      this.setState({ isAuthenticated: false, loading: false });
    } catch (error) {
      console.error('Logout failed:', error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { children } = this.props;
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
          setIsAuthenticated: this.setIsAuthenticated,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
