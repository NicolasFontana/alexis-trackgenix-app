import React from 'react';
import { NavLink } from 'react-router-dom';
import firebase from 'helper/firebase';
import styles from './sidebar.module.css';

const SideBar = ({ state, routes, logout }) => {
  let width = state ? '150px' : '0px';

  return (
    <aside style={{ width }} className={styles.sidebar}>
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
          {logout && (
            <li className={styles.li}>
              <NavLink
                to={'/home'}
                exact
                activeStyle={{ color: '#A1D28C' }}
                onClick={() => {
                  firebase.auth().signOut();
                }}
              >
                Log Out
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
