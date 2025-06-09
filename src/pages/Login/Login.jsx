import React, { useState, useContext } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import { AuthContext } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Title from '../../components/Title/Title';
import Group from '../../components/Group/Group';
import Container from '../../components/Container/Container';
import ProgressBar from '../../components/ProcessBar/ProcessBar';
import '../../pages/Login/Login.scss';

const Login = () => {
  const { t } = useI18n();
  const authContext = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progressData, setProgressData] = useState({
    progress: 0,
    status: 'loading',
    step: t('login.loadingStep') || 'Đang xử lý đăng nhập...',
  });

  React.useEffect(() => {
    document.title = t('login.title') || 'Đăng nhập';
    let timer;
    if (showProgress) {
      if (progressData.progress >= 100) {
        setRedirectToDashboard(true);
      } else {
        timer = setTimeout(() => {
          setProgressData((prev) => ({
            ...prev,
            progress: Math.min(prev.progress + 20, 100),
            step: `Đang tải ${Math.min(prev.progress + 20, 100)}%`,
          }));
        }, 300);
      }
    }
    return () => clearTimeout(timer);
  }, [showProgress, progressData.progress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await authContext.login(username, password);
      setShowProgress(true); // Bắt đầu progress sau khi login thành công
    } catch (err) {
      setError(err.message || 'Đăng nhập thất bại');
      setIsLoading(false);
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" replace />;
  }

  if (showProgress) {
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
      <Group className="medium">
        <Title text={t('login.title')} />
        <form onSubmit={handleSubmit}>
          <div>
            <Input
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t('login.usernamePlaceholder')}
              error={error ? t('login.usernameError') : ''}
              required
            />
          </div>
          <div style={{ marginTop: 10 }}>
            <Input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t('login.passwordPlaceholder')}
              error={error ? t('login.passwordError') : ''}
              required
            />
          </div>
          {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
          <Button
            type="submit"
            label={t('login.loginButton')}
            variant="primary"
            fontSize="16px"
            fontWeight="bold"
            borderRadius="6px"
            padding="10px 20px"
            margin="15px 0 0 0"
            width="100%"
            disabled={isLoading}
          />
          {isLoading && (
            <div className="spinner-container">
              <div className="spinner" />
              <p style={{ marginTop: 10 }}>{t('login.loggingInMessage')}</p>
            </div>
          )}
        </form>
      </Group>
    </Container>
  );
};

export default Login;
