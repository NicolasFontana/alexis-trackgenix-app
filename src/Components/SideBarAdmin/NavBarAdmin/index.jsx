import {
  faClock,
  faFolderClosed,
  faHouse,
  faListCheck,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbaradmins.module.css';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const projects = <FontAwesomeIcon icon={faFolderClosed}></FontAwesomeIcon>;
const tasks = <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>;
const timesheets = <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>;

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.homeContainer}>
        <NavLink
          className={styles.homepage}
          exact
          activeStyle={{ color: '#A1D28C', fontWeight: 700 }}
          to="/home"
        >
          {home} Home
        </NavLink>
      </div>
      <ul>
        <li>
          <NavLink
            className={styles.link}
            exact
            activeStyle={{ color: '#A1D28C', fontWeight: 700 }}
            to="/admins"
          >
            {users} Admins
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            exact
            activeStyle={{ color: '#A1D28C', fontWeight: 700 }}
            to="/super-admins"
          >
            {users} Super Admins
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            exact
            activeStyle={{ color: '#A1D28C', fontWeight: 700 }}
            to="/employees"
          >
            {users} Employees
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            exact
            activeStyle={{ color: '#A1D28C', fontWeight: 700 }}
            to="/projects"
          >
            {projects} Projects
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            exact
            activeStyle={{ color: '#A1D28C', fontWeight: 700 }}
            to="/time-sheets"
          >
            {timesheets} Timesheets
          </NavLink>
        </li>
        <li>
          <NavLink
            className={styles.link}
            exact
            activeStyle={{ color: '#A1D28C', fontWeight: 700 }}
            to="/tasks"
          >
            {tasks} Tasks
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
