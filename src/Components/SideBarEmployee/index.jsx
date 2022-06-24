import React from 'react';
import styles from './sidebaremployee.module.css';
import SideBarEmployee from './SideBarEmployee/index';

function SideBarE() {
  return (
    <div className={styles.sidebar}>
      <SideBarEmployee />
    </div>
  );
}

export default SideBarE;
