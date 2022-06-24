import React from 'react';
import styles from './sidebaradmin.module.css';
import SideBarAdmin from './SideBarAdmin/index';

function SideBarA() {
  return (
    <div className={styles.sidebar}>
      <SideBarAdmin />
    </div>
  );
}

export default SideBarA;
