import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = ({ sidebarOpener, routesHeader }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user?.data);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === user._id
  );

  const [openSidebar, setOpenSidebar] = useState(false);

  const userIcon = <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>;
  let userProfile;
  let burgerIcon;
  let url;

  if (location.pathname.substring(0, 6) === '/admin') {
    url = '/admin';
  } else if (location.pathname.substring(0, 9) === '/employee') {
    url = '/employee';
  } else if (location.pathname.substring(0, 12) === '/super-admin') {
    url = '/super-admin';
  } else {
    url = '/home';
  }

  if (
    location.pathname !== '/home' &&
    location.pathname !== '/auth/login' &&
    location.pathname !== '/auth/signup'
  ) {
    userProfile = (
      <NavLink to={'/employee/profile'} exact className={styles.user}>
        <div className={styles.userPicture}>
          {employee?.picture ? (
            <img src={employee.picture} className={styles.userLogged} />
          ) : employee ? (
            userIcon
          ) : null}
        </div>
        <p>
          {employee?.firstName} {employee?.lastName}
        </p>
      </NavLink>
    );
    burgerIcon = (
      <div className={styles.burger} onClick={() => sidebarOpenClose(openSidebar)}>
        <div className={styles.bar1}></div>
        <div className={styles.bar2}></div>
        <div className={styles.bar3}></div>
      </div>
    );
  } else {
    burgerIcon = '';
  }

  const sidebarOpenClose = (state) => {
    setOpenSidebar(!state);
    sidebarOpener(state);
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        {burgerIcon}
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
        <div className={styles.title}>{userProfile}</div>
      </div>
    </header>
  );
};

export default Header;
