import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import '../../Error/Error.scss'

import { useI18n } from '../../../contexts/I18nContext';

const particlesOptions = {
  background: {
    color: "#fefefe",
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ["repulse", "bubble"],
      },
      onClick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
    modes: {
      repulse: { distance: 100, duration: 0.4 },
      bubble: { distance: 150, size: 30, duration: 2, opacity: 1 },
      push: { quantity: 4 },
    },
  },
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        area: 800,
      },
    },
    color: {
      value: "#c0392b", // đỏ đậm để thể hiện bị cấm
    },
    shape: {
      type: "image",
      image: [
        {
          src: "/images/lock.png",
          width: 32,
          height: 32,
        },
        {
          src: "/images/stop.png",
          width: 32,
          height: 32,
        },
      ],
    },
    opacity: {
      value: 0.75,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.4, sync: false },
    },
    size: {
      value: 18,
      random: true,
      anim: { enable: true, speed: 5, size_min: 10, sync: false },
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outMode: "bounce",
      attract: { enable: true, rotateX: 600, rotateY: 1200 },
    },
    links: { enable: false },
  },
  detectRetina: true,
};

const Error403 = () => {
  const { t } = useI18n();

  return (
    <div className="notfound-container">
      <Particles className="particles-bg" options={particlesOptions} />

      <div className="notfound-content">
        <div className="notfound-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#c0392b"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 
                     20c-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9-4.029 9-9 9zm2-10H10v4h4v-4zm0-6H10v2h4V5z" />
          </svg>
        </div>

        <h1>403</h1>
        <p className="notfound-title">{t('error403.title') || 'Access Denied'}</p>
        <p className="notfound-description">
          {t('error403.description') || 'You do not have permission to access this page.'}
        </p>
        <Link to="/" className="notfound-button">
          {t('notfound.backToHome') || 'Back to Home'}
        </Link>
      </div>
    </div>
  );
};

export default Error403;
