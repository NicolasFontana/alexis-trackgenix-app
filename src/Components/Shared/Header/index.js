import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './header.module.css';

const Header = ({ sidebarOpener }) => {
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const userIcon = <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>;

  let user;

  //This comparison is used to show or hide the profile when its not logged
  if (
    location.pathname !== '/home' &&
    location.pathname !== '/auth/login' &&
    location.pathname !== '/auth/signup'
  ) {
    user = (
      <div className={styles.user}>
        <div>{userIcon}</div>
        <p>Username</p>
      </div>
    );
  }

  const sidebarOpenClose = (state) => {
    setOpenSidebar(!state);
    sidebarOpener(state);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.burger} onClick={() => sidebarOpenClose(openSidebar)}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
        <h2 className={styles.title}>Trackgenix</h2>
      </div>
      <div>{user}</div>
    </header>
  );
};

export default Header;
