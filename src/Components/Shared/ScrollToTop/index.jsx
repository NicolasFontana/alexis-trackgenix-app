import React from 'react';
import { useState, useEffect } from 'react';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './scroll-to-top.module.css';

const ScrollToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const angleUpIcon = (
    <FontAwesomeIcon
      icon={faAngleUp}
      className={`${styles.iconToTop} + ${showTopBtn ? styles.iconActive : null} `}
      onClick={goToTop}
    />
  );

  return <div className={styles.containerButton}>{angleUpIcon}</div>;
};

export default ScrollToTop;
