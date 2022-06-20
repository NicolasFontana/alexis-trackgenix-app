import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.headerContainer}>
        <Link className={styles.header} to="/home">
          Trackgenix
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
