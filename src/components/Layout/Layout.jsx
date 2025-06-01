// src/layout/Layout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './Layout.scss';

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const pageTransition = {
  duration: 0.4,
  ease: 'easeInOut',
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="layout__page"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Layout;
