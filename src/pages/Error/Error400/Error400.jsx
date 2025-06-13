import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import '../../Error/Error.scss' // Dùng chung style với NotFound để tiết kiệm CSS

import { useI18n } from '../../../contexts/I18nContext';

const particlesOptions = {
  background: {
    color: "#fffaf0", // nhạt hơn để dễ chịu
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
      value: "#e67e22", // màu cam để phân biệt với 404
    },
    shape: {
      type: "image",
      image: [
        {
          src: "/images/question.png",
          width: 32,
          height: 32,
        },
        {
          src: "/images/error.png",
          width: 32,
          height: 32,
        },
      ],
    },
    opacity: {
      value: 0.7,
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

const Error400 = () => {
  const { t } = useI18n();

  return (
    <div className="notfound-container">
      <Particles className="particles-bg" options={particlesOptions} />

      <div className="notfound-content">
        <div className="notfound-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#e67e22"
            width="80"
            height="80"
            viewBox="0 0 24 24"
          >
            <path d="M11.001 10h2v5h-2zM11 16h2v2h-2z" />
            <path d="M12 2C6.486 2 2 6.487 2 12s4.486 10 10 10 10-4.487 10-10S17.514 2 12 2zm0 18c-4.41 
                     0-8-3.589-8-8s3.59-8 8-8 8 3.589 8 8-3.59 8-8 8z" />
          </svg>
        </div>

        <h1>400</h1>
        <p className="notfound-title">{t('error400.title') || 'Bad Request'}</p>
        <p className="notfound-description">
          {t('error400.description') || 'Something went wrong with your request. Please check and try again.'}
        </p>
        <Link to="/" className="notfound-button">
          {t('notfound.backToHome') || 'Back to Home'}
        </Link>
      </div>
    </div>
  );
};

export default Error400;
