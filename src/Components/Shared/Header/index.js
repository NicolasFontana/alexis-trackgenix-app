import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './header.module.css';

const userOff = <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>;

const Header = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user?.data);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === user._id
  );

  return (
    <header>
      <div className={styles.pathname}>
        {location.pathname.slice(location.pathname.lastIndexOf('/') + 1)}
      </div>
      <NavLink to={'/employee/profile'} exact className={styles.user}>
        <div>
          {employee?.picture ? (
            <img src={employee.picture} className={styles.userLogged} />
          ) : user ? (
            userOff
          ) : null}
        </div>
        <p>
          {employee?.firstName} {employee?.lastName}
        </p>
      </NavLink>
    </header>
  );
};

export default Header;
