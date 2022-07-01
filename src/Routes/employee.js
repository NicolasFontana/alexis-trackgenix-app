import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Timesheet from 'Components/Employee/Timesheet';
import Projects from 'Components/Employee/Projects';
import Layout from 'Components/Layout';
import Profile from 'Components/Employee/Profile';
import { faClock, faFolderClosed, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const projects = <FontAwesomeIcon icon={faFolderClosed}></FontAwesomeIcon>;
const timesheets = <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>;

const employeesRoutes = [
  { icon: home, name: 'Home', path: '/employee' },
  { icon: projects, name: 'Projects', path: '/employee/projects' },
  { icon: timesheets, name: 'Time-Sheet', path: '/employee/time-sheet' },
  { name: 'Profile', path: '/employee/profile' }
];

const Employee = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={employeesRoutes} logout>
      <Switch>
        <Route path={`${url}/time-sheet`} component={Timesheet} />
        <Route path={`${url}/projects`} component={Projects} />
        <Route path={`${url}/profile`} component={Profile} />
        <Route exact path={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default Employee;
