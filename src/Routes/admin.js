import React from 'react';
import { Redirect, Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Admin/Home';
import Layout from 'Components/LayoutSideBar';
import Admins from 'Components/Admin/Admins';
import SuperAdmins from 'Components/Admin/SuperAdmins';
import Employees from 'Components/Admin/Employees';
import Projects from 'Components/Admin/Projects';
import Timesheets from 'Components/Admin/TimeSheets';
import Tasks from 'Components/Admin/Tasks';
import styles from './routes.module.css';
import {
  faClock,
  faFolderClosed,
  faHouse,
  faListCheck,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const projects = <FontAwesomeIcon icon={faFolderClosed}></FontAwesomeIcon>;
const tasks = <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>;
const timesheets = <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>;

const adminsRoutes = [
  { icon: home, name: 'Home', path: '/admin' },
  { icon: users, name: 'Admins', path: '/admin/admins' },
  { icon: users, name: 'Super-Admins', path: '/admin/super-admins' },
  { icon: users, name: 'Employees', path: '/admin/employees' },
  { icon: projects, name: 'Projects', path: '/admin/projects' },
  { icon: timesheets, name: 'Time-Sheet', path: '/admin/time-sheets' },
  { icon: tasks, name: 'Tasks', path: '/admin/tasks' }
];

const Admin = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes} logout>
      <div className={styles.currentScreen}>
        <Switch>
          <Route path={`${url}/admins`} component={Admins} />
          <Route path={`${url}/super-admins`} component={SuperAdmins} />
          <Route path={`${url}/employees`} component={Employees} />
          <Route path={`${url}/projects`} component={Projects} />
          <Route path={`${url}/time-sheets`} component={Timesheets} />
          <Route path={`${url}/tasks`} component={Tasks} />
          <Route exact path={`${url}/`} component={Home} />
          <Redirect exact to={`${url}/`} />
        </Switch>
      </div>
    </Layout>
  );
};

export default Admin;
