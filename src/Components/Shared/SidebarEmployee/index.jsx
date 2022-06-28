import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';

const SideBar = ({ routes }) => {
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
              <NavLink to={route.path} exact activeStyle={{ color: '#A1D28C' }}>
                {route.icon}
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
