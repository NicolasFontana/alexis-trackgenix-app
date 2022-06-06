import React from 'react';
import styles from './preloader.module.css';

const Preloader = ({ children }) => {
  return (
    <section className={styles.containerLoading}>
      {children}
      <div className={styles.ldsRoller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  );
};

export default Preloader;
