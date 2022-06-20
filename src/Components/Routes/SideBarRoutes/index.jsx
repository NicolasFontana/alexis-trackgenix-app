import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './sidebar.module.css';

const SideBar = ({ titles, directions }) => {
  console.log(titles);
  console.log(directions);
  return (
    <aside className={styles.sidebar}>
      <div className={styles.headerContainer}>
        <Link className={styles.header} to="/home">
          Trackgenix
        </Link>
      </div>
      <nav>
        {titles.map((title, index) => {
          return (
            <ul key={title} className={styles.ul}>
              <li>
                <NavLink to={directions[index]} className={styles.li}>
                  {title}
                </NavLink>
              </li>
            </ul>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;
