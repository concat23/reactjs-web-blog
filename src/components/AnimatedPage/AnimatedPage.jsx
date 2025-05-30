// src/components/AnimatedPage.jsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const pageTransition = {
  duration: 0.4,
  ease: 'easeInOut',
};

const AnimatedPage = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={pageTransition}
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      backgroundColor: '#fff', // giúp không bị trong suốt
    }}
  >
    {children}
  </motion.div>
);

export default AnimatedPage;
