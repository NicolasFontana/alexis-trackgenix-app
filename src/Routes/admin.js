import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Admin/Home';
import Layout from 'Components/Layout';
import Admins from 'Components/Admin/Admins';
import SuperAdmins from 'Components/Admin/SuperAdmins';
import Employees from 'Components/Admin/Employees';
import EmployeeId from 'Components/Admin/Employees/EmployeePage';
import Projects from 'Components/Admin/Projects';
import ProjectId from 'Components/Admin/Projects/ProjectPage';
import Timesheets from 'Components/Admin/TimeSheets';
import Tasks from 'Components/Admin/Tasks';
import TaskId from 'Components/Admin/Tasks/TaskId';
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
      <Switch>
        <Route exact path={`${url}/admins`} component={Admins} />
        <Route exact path={`${url}/super-admins`} component={SuperAdmins} />
        <Route exact path={`${url}/employees`} component={Employees} />
        <Route exact path={`${url}/employees/:id`} component={EmployeeId} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/projects/:id`} component={ProjectId} />
        <Route exact path={`${url}/time-sheets`} component={Timesheets} />
        <Route exact path={`${url}/tasks`} component={Tasks} />
        <Route exact path={`${url}/tasks/:id`} component={TaskId} />
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default Admin;
