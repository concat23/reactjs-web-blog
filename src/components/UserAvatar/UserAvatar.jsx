import React from 'react';
import './UserAvatar.scss'; // SCSS cho avatar

const UserAvatar = ({ user }) => {
  return (
    <div className="user-avatar">
      <img
        src={user?.avatarUrl || '/images/empty.png'}
        alt={user?.name || 'User'}
        className="user-avatar__image"
      />
      <span className="user-avatar__name">{user?.name || 'Guest'}</span>
    </div>
  );
};

export default UserAvatar;
