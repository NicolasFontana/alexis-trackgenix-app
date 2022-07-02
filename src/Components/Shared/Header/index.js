import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './header.module.css';

const user = <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>;

const Header = () => {
  const location = useLocation();

  return (
    <header>
      <div className={styles.pathname}>
        {location.pathname.slice(location.pathname.lastIndexOf('/') + 1)}
      </div>
      <div className={styles.user}>
        <div> {user} </div>
        <p> Username</p>
      </div>
    </header>
  );
};

export default Header;
