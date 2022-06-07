import React from 'react';
import NavBar from '../Shared/NavBar/navbar';
import styles from './sidebar.module.css';

const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>Trackgenix</div>
      <div>
        <NavBar />
      </div>
    </aside>
  );
};

export default SideBar;
