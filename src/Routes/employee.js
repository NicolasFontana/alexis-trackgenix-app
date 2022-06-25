import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Timesheet from 'Components/Employee/Timesheet';
import Projects from 'Components/Employee/Projects';
import Layout from 'Routes/Layout';
import {
  faClock,
  faFolderClosed,
  faHouse,
  faUsers,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const user = <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>;
const projects = <FontAwesomeIcon icon={faFolderClosed}></FontAwesomeIcon>;
const timesheets = <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>;

const employeesRoutes = [
  { icon: home, name: 'Home', path: '/Home' },
  { icon: users, name: 'Employees', path: '/employee/employees' },
  { icon: projects, name: 'Projects', path: '/employee/projects' },
  { icon: timesheets, name: 'Time-Sheet', path: '/employee/time-sheets' },
  { icon: user, name: 'Profile', path: '/employee/profile' }
];

const Employee = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={employeesRoutes}>
      <Switch>
        <Route path={`${url}/`} component={Home} />
        <Route path={`${url}/time-sheet`} component={Timesheet} />
        <Route path={`${url}/projects`} component={Projects} />
        {/* <Route path={`${url}/profile`} component={Profile} /> */}
        <Redirect to={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default Employee;
