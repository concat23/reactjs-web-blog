import React from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-tsparticles';
import './NotFound.scss';

import { useI18n } from '../../../contexts/I18nContext'

const particlesOptions = {
  background: {
    color: "#f5f6fa",
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ["repulse", "bubble"], // Thêm bubble để particles phồng to khi hover
      },
      onClick: {
        enable: true,
        mode: "push", // Thêm push để click tạo thêm particles
      },
      resize: true,
    },
    modes: {
      repulse: {
        distance: 100,
        duration: 0.4,
      },
      bubble: {
        distance: 150,
        size: 30,
        duration: 2,
        opacity: 1,
      },
      push: {
        quantity: 4,
      },
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
      value: "#e74c3c",
    },
    shape: {
      type: "image",
      image: [
        {
          src: "/images/bee.png",
          width: 32,
          height: 32,
        },
        {
          src: "/images/butterfly.png",
          width: 32,
          height: 32,
        },
      ],
    },
    opacity: {
      value: 0.8,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.4,
        sync: false,
      },
    },
    size: {
      value: 20,
      random: true,
      anim: {
        enable: true,
        speed: 5,
        size_min: 10,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: true,
      straight: false,
      outMode: "bounce",
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200,
      },
    },
    links: {
      enable: false,
    },
  },
  detectRetina: true,
};

const NotFound = () => {
     const { t } = useI18n();


  return (
    <div className="notfound-container">
      <Particles className="particles-bg" options={particlesOptions} />

      <div className="notfound-content">
        <div className="notfound-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#e74c3c"
            width="80"
            height="80"
          >
            <path d="M256 48C141 48 48 141 48 256s93 208 208 208 208-93 208-208S371 48 256 48zm0 368c-88.2 0-160-71.8-160-160S167.8 96 256 96s160 71.8 160 160-71.8 160-160 160zm0-256c-13.3 0-24 10.7-24 24v72c0 13.3 10.7 24 24 24s24-10.7 24-24v-72c0-13.3-10.7-24-24-24zm0 160c-13.3 0-24 10.7-24 24s10.7 24 24 24 24-10.7 24-24-10.7-24-24-24z" />
          </svg>
        </div>

        <h1>404</h1>
        <p className="notfound-title">{t('notfound.title')}</p>
        <p className="notfound-description">
            {t('notfound.description')}
        </p>
        <Link to="/" className="notfound-button">
            {t('notfound.backToHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
