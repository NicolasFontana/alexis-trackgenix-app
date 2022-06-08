import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header = ({ routes }) => {
  return (
    <header>
      <div className={styles.appName}>
        <h2>Trackgenix</h2>
      </div>
      <nav className={styles.navbar}>
        <Link className={styles.homepage} to="/home"></Link>
        <ul>
          {routes.map((route) => {
            return (
              <li className={styles.list} key={route.section}>
                <Link className={styles.link} to={route.path}>
                  {route.section}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
