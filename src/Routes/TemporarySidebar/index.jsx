import React from 'react';
import { Link } from 'react-router-dom';
import styles from './sidebar.module.css';

const SideBar = ({ routes }) => {
  console.log(routes);
  return (
    <aside className={styles.sidebar}>
      <div className={styles.headerContainer}>
        <Link className={styles.header} to="/home">
          Trackgenix
        </Link>
      </div>
      <nav>
        <ul className={styles.ul}>
          {routes?.map((route) => (
            <li key={route.name} className={styles.li}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
