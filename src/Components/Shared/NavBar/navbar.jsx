import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = ({ routes }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.homeContainer}>
        <Link className={styles.homepage} to="/home">
          &#9751; Home
        </Link>
      </div>
      <ul>
        {routes.map((route) => {
          return (
            <li key={route.section}>
              <Link className={styles.link} to={route.path}>
                {route.section}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
