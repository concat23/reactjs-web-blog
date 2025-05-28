import React, { Component } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

class Login extends Component {
  static contextType = AuthContext;

  state = {
    username: '',
    password: '',
    error: '',
    redirectToDashboard: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    try {
      await this.context.login(username, password);
      this.setState({ redirectToDashboard: true });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    if (this.state.redirectToDashboard) {
      return <Navigate to="/dashboard" replace />;
    }

    return (
      <div style={{ maxWidth: 320, margin: '100px auto' }}>
        <h2>Admin Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              required
              autoFocus
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          {this.state.error && (
            <p style={{ color: 'red', marginTop: 10 }}>{this.state.error}</p>
          )}
          <button type="submit" style={{ marginTop: 15 }}>
            Đăng nhập
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
