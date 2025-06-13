import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import { useI18n } from '../../../contexts/I18nContext'
import '../../Error/Error.scss'

const particlesOptions = {
  background: {
    color: "#f5f6fa",
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: ["repulse", "bubble"] },
      onClick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      bubble: { distance: 150, size: 30, duration: 2, opacity: 1 },
      push: { quantity: 4 },
    },
  },
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: "#3498db" }, // Màu xanh dương cho 505
    shape: { type: "circle" },
    opacity: { value: 0.8, random: true, anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false } },
    size: { value: 20, random: true, anim: { enable: true, speed: 5, size_min: 10, sync: false } },
    move: { enable: true, speed: 2, direction: "none", random: true, straight: false, outMode: "bounce" },
    links: { enable: false },
  },
  detectRetina: true,
};

const Error505 = () => {
  const { t } = useI18n();

  return (
    <div className="error505-container">
      <Particles className="particles-bg" options={particlesOptions} />

      <div className="error505-content">
        <div className="error505-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#3498db"
            width="80"
            height="80"
          >
            <path d="M256 48C141 48 48 141 48 256s93 208 208 208 208-93 208-208S371 48 256 48zm0 368c-88.2 0-160-71.8-160-160S167.8 96 256 96s160 71.8 160 160-71.8 160-160 160zm-48-224v96h32v-96h-32zm80 0v96h32v-96h-32z" />
          </svg>
        </div>

        <h1>505</h1>
        <p className="error505-title">{t('error505Title')}</p>
        <p className="error505-description">{t('error505Description')}</p>
        <Link to="/" className="error505-button">
          {t('goBackHome')}
        </Link>
      </div>
    </div>
  );
};

export default Error505;
