import React, { Component } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

class Dashboard extends Component {
  static contextType = AuthContext;

  handleLogout = () => {
    this.context.logout();
  };

  render() {
    return (
      <div style={{ padding: 20 }}>
        <h1>Dashboard Admin</h1>
        <button onClick={this.handleLogout}>Logout</button>
      </div>
    );
  }
}

export default Dashboard;
