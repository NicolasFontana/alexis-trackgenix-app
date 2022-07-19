import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Layout from 'Components/Layout';
import Home from 'Components/Employee/Home';
import Profile from 'Components/Employee/Profile';
import Projects from 'Components/Employee/Projects';
import Timesheets from 'Components/Employee/Timesheet';
import Tasks from 'Components/Employee/Timesheet/Tasks';
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
        <Route exact path={`${url}/profile`} component={Profile} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/time-sheet`} component={Timesheets} />
        <Route exact path={`${url}/time-sheet/:id`} component={Tasks} />
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default Employee;
