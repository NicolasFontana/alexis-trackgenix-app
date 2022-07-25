import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = ({ sidebarOpener, routesHeader }) => {
  const location = useLocation();
  const [openSidebar, setOpenSidebar] = useState(false);
  const userIcon = <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>;

  let user;
  //The title redirect to this url
  let url =
    location.pathname.substring(0, 6) === '/admin'
      ? '/admin'
      : location.pathname.substring(0, 9) === '/employee'
      ? '/employee'
      : '/home';

  //This comparison is used to show or hide the profile button
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
        {user ? (
          <div className={styles.burger} onClick={() => sidebarOpenClose(openSidebar)}>
            <div className={styles.bar1}></div>
            <div className={styles.bar2}></div>
            <div className={styles.bar3}></div>
          </div>
        ) : null}
        <h2 className={styles.title}>
          <Link to={url}>Trackgenix</Link>
        </h2>
      </div>
      <div className={styles.rightSide}>
        <nav>
          <ul className={styles.ul}>
            {routesHeader?.map((route) => (
              <li key={route.name} className={styles.li}>
                <NavLink to={route.path} exact activeStyle={{ fontWeight: 'bold' }}>
                  {route.icon}
                  {route.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>{user}</div>
      </div>
    </header>
  );
};

export default Header;
