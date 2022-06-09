import {
  faClock,
  faFolderClosed,
  faHouse,
  faListCheck,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const projects = <FontAwesomeIcon icon={faFolderClosed}></FontAwesomeIcon>;
const tasks = <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>;
const timesheets = <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>;

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.homeContainer}>
        <Link className={styles.homepage} to="/home">
          {home} Home
        </Link>
      </div>
      <ul>
        <li>
          <Link className={styles.link} to="/admins">
            {users} Admins
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/super-admins">
            {users} Super Admins
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/employees">
            {users} Employees
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/projects">
            {projects} Projects
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/time-sheets">
            {timesheets} Timesheets
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/tasks">
            {tasks} Tasks
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
