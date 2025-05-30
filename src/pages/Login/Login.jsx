import React, { Component } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import Group from '../../components/Group/Group';
import Container from '../../components/Container/Container';
import ProgressBar from '../../components/ProcessBar/ProcessBar';

class Login extends Component {
  static contextType = AuthContext;

  state = {
    username: '',
    password: '',
    error: '',
    redirectToDashboard: false,
    isLoading: false,
    progressData: {
      progress: 0,
      status: 'loading',
      step: 'Đang xử lý đăng nhập...',
    },
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: '' });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    try {
      await this.context.login(username, password);
      this.setState({ isLoading: true }, this.startProgress);
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  startProgress = () => {
    const { progress } = this.state.progressData;

    if (progress >= 100) {
      this.setState({ redirectToDashboard: true });
      return;
    }

    this.timer = setTimeout(() => {
      const nextProgress = Math.min(progress + 20, 100);
      this.setState(
        (prevState) => ({
          progressData: {
            ...prevState.progressData,
            progress: nextProgress,
            step: `Đang tải ${nextProgress}%`,
          },
        }),
        this.startProgress
      );
    }, 300);
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const { username, password, error, redirectToDashboard, isLoading, progressData } = this.state;

    if (redirectToDashboard) {
      return <Navigate to="/dashboard" replace />;
    }

    if (isLoading) {
      return (
        <div style={{ padding: 50 }}>
          <ProgressBar
            progress={progressData.progress}
            status={progressData.status}
            step={progressData.step}
          />
        </div>
      );
    }

    return (
      <Container widthVariant="width-80" heightVariant="height-auto">
        <Group className="small">
          <Title text="Admin Login" />
          <form onSubmit={this.handleSubmit}>
            <div>
              <Input
                name="username"
                value={username}
                onChange={this.handleChange}
                placeholder="Nhập tên đăng nhập ..."
                error={error ? 'Tên đăng nhập không hợp lệ' : ''}
                required={true}
              />
            </div>
            <div style={{ marginTop: 10 }}>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                placeholder="Nhập mật khẩu ..."
                error={error ? 'Mật khẩu không hợp lệ' : ''}
                required={true}
              />
            </div>
            {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
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
        </Group>
      </Container>
    );
  }
}

export default Login;
