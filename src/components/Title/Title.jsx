import React from 'react';
import PropTypes from 'prop-types';
import './Title.scss';

const Title = ({
  text,
  fontSize,
  color,
  fontFamily,
  fontWeight,
  fontStyle,
  textTransform,
  className = '',
  style = {},
  responsive = true,
}) => {
  // Tạo style inline, ưu tiên props truyền vào
  const inlineStyle = {
    fontSize,
    color,
    fontFamily,
    fontWeight,
    fontStyle,
    textTransform,
    ...style,  // Cho phép override thêm style động bên ngoài
  };

  return (
    <h1
      className={`title ${responsive ? 'responsive' : ''} ${className}`}
      style={inlineStyle}
      aria-label={text}
    >
      {text}
    </h1>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  fontSize: PropTypes.string,    // vd: '2rem', '20px'
  color: PropTypes.string,       // vd: '#ff0000', 'rgba(0,0,0,0.8)'
  fontFamily: PropTypes.string,  // vd: 'Arial, sans-serif'
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // vd: 'bold', 700
  fontStyle: PropTypes.string,   // vd: 'normal', 'italic'
  textTransform: PropTypes.string, // vd: 'uppercase', 'capitalize'
  className: PropTypes.string,
  style: PropTypes.object,
  responsive: PropTypes.bool,
};

Title.defaultProps = {
  fontSize: null,
  color: null,
  fontFamily: null,
  fontWeight: null,
  fontStyle: 'normal',
  textTransform: 'none',
  className: '',
  style: {},
  responsive: true,
};

export default Title;
