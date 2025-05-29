import React, { Component } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import ProgressBar from '../../components/ProcessBar/ProcessBar';
import LogoutButton from '../Logout/Logout';

class Dashboard extends Component {
  static contextType = AuthContext;

  state = {
    progressData: {
      progress: 0,
      status: 'loading',
      step: 'Bắt đầu xử lý...',
    },
  };

  componentDidMount() {
    const hasRun = sessionStorage.getItem('progressHasRun');
    if (!hasRun) {
      this.fakeProgress();
    } else {
      this.setState({
        progressData: {
          progress: 100,
          status: 'success',
          step: 'Hoàn thành',
        },
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer); // tránh memory leak
  }

  fakeProgress = () => {
  const { progress } = this.state.progressData;

  if (progress >= 100) {
    this.setState({
      progressData: {
        progress: 100,
        status: 'success',
        step: 'Hoàn thành',
      },
    });
    sessionStorage.setItem('progressHasRun', 'true');
    return;
  }

  this.timer = setTimeout(() => {
    const nextProgress = Math.min(progress + 20, 100); // giới hạn max 100%
    this.setState(
      (prevState) => ({
        progressData: {
          ...prevState.progressData,
          progress: nextProgress,
          step: `Tiến trình: ${nextProgress}%`,
        },
      }),
      this.fakeProgress
    );
  }, 200); // giảm delay để load nhanh hơn
};


  handleLogout = () => {
    sessionStorage.removeItem('progressHasRun');
    this.context.logout();
  };

  render() {
  const { progress, status, step } = this.state.progressData;

  return (
    <div style={{ padding: 20 }}>
      {/* Chỉ hiển thị ProgressBar khi progress < 100 */}
      {progress < 100 && (
        <ProgressBar 
          progress={progress}
          status={status}
          step={step === 'Hoàn thành' ? '' : step} // ẩn text 'Hoàn thành'
        />
      )}

      {/* Hiển thị nội dung Dashboard và nút Logout khi progress = 100 */}
      {progress === 100 && (
        <>
          <h1>Dashboard Admin</h1>
          <LogoutButton onClick={this.handleLogout} />
        </>
      )}
    </div>
  );
}

}

export default Dashboard;
