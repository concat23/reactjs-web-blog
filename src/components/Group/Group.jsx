import React from 'react';
import './Group.scss';

const Group = ({ children, className = '', width }) => {
  const style = width ? { maxWidth: width } : {};
  return (
    <div className={`group-container ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Group;
