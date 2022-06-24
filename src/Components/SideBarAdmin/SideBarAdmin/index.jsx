import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBarAdmin/index';
import styles from './sidebar.module.css';

const SideBarAdmin = ({ routes }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.headerContainer}>
        <Link className={styles.header} to="/home">
          Trackgenix
        </Link>
      </div>
      <div>
        <NavBar routes={routes} />
      </div>
    </aside>
  );
};

export default SideBarAdmin;
