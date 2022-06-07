import React from 'react';
//import { Link } from 'react-router-dom';
import styles from './navbar.module.css';

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <a href="/home">home</a>
        </li>
        <li>
          <a href="/admins">admins</a>
        </li>
        <li>
          <a href="/super-admins">super admins</a>
        </li>
        <li>
          <a href="/employees">employees</a>
        </li>
        <li>
          <a href="/projects">projects</a>
        </li>
        <li>
          <a href="/time-sheets">timesheets</a>
        </li>
        <li>
          <a href="/tasks">tasks</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
