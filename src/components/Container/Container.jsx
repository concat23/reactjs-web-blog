import React from 'react';
import './Container.scss';

const Container = ({
  children,
  className = '',
  style = {},
  widthVariant = '', 
  heightVariant = '', 
}) => {
  const widthClass = widthVariant ? `container--${widthVariant}` : '';
  const heightClass = heightVariant ? `container--${heightVariant}` : '';

  return (
    <div className={`container ${widthClass} ${heightClass} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Container;
