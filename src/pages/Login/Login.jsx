import React, { Component } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

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
           <Input
              label="Tên đăng nhập"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              placeholder="Nhập tên đăng nhập"
              error={this.state.error ? "Tên đăng nhập không hợp lệ" : ''}
               required={true}  
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Input
              label="Mật khẩu"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Nhập mật khẩu"
              error={this.state.error ? "Mật khẩu không hợp lệ" : ''}
               required={true}  
            />
          </div>
          {this.state.error && (
            <p style={{ color: 'red', marginTop: 10 }}>{this.state.error}</p>
          )}
        <Button
            type="submit"
            label="Đăng nhập"
            variant="primary"
            fontSize="16px"
            fontWeight="bold"
            borderRadius="6px"
            padding="10px 20px"
            margin="15px 0 0 0"
            width="100%"
          />


        </form>
      </div>
    );
  }
}

export default Login;
