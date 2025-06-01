// BeeIcon.jsx
import React from 'react';

const BeeIcon = () => (
  <svg
    width="64"
    height="64"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="30" stroke="#FFCB05" strokeWidth="4" fill="#FFF8E1" />
    <ellipse cx="24" cy="32" rx="6" ry="10" fill="#FFCB05">
      <animate attributeName="rx" values="6;8;6" dur="2s" repeatCount="indefinite" />
      <animate attributeName="ry" values="10;12;10" dur="2s" repeatCount="indefinite" />
    </ellipse>
    <path
      d="M18 32 L14 28 M18 32 L14 36"
      stroke="#333" strokeWidth="2" strokeLinecap="round"
      >
      <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
    </path>
    <circle cx="44" cy="32" r="8" fill="#F2B705" />
    <path
      d="M42 24 C46 28, 46 36, 42 40"
      stroke="#000" strokeWidth="1" strokeLinecap="round"
    >
      <animate attributeName="stroke-dashoffset" from="0" to="100" dur="3s" repeatCount="indefinite"/>
    </path>
  </svg>
);

export default BeeIcon;
