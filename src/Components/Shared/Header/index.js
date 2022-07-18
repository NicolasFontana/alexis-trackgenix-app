import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './header.module.css';

const user = <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>;

const Header = () => {
  const location = useLocation();
  let indexOfLastSlash = location.pathname.lastIndexOf('/');
  let isID = location.pathname.slice(indexOfLastSlash + 1).length === 24;
  let idTitle = location.pathname.slice(
    location.pathname.slice(0, indexOfLastSlash).lastIndexOf('/') + 1,
    indexOfLastSlash - 1
  );

  return (
    <header>
      <div className={styles.pathname}>
        {isID
          ? `${idTitle}: ${location.pathname.slice(indexOfLastSlash + 1)}`
          : location.pathname.slice(indexOfLastSlash + 1)}
      </div>
      <div className={styles.user}>
        <div> {user} </div>
        <p> Username</p>
      </div>
    </header>
  );
};

export default Header;
