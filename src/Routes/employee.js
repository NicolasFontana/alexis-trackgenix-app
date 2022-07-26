import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Timesheet from 'Components/Employee/Timesheet';
import ProjectPage from 'Components/Employee/Projects/ProjectPage';
import MemberTimesheetPage from 'Components/Employee/Projects/ProjectPage/MemberTimesheetPage';
import Layout from 'Components/Layout';
import Profile from 'Components/Employee/Profile';
import Projects from 'Components/Employee/Projects';
import Tasks from 'Components/Employee/Timesheet/Tasks';
import { faClock, faFolderClosed, faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const projects = <FontAwesomeIcon icon={faFolderClosed}></FontAwesomeIcon>;
const timesheets = <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>;

const employeesRoutes = [
  { icon: home, name: 'Home', path: '/employee' },
  { icon: projects, name: 'Projects', path: '/employee/projects' },
  { icon: timesheets, name: 'Time-Sheet', path: '/employee/time-sheet' }
];

const Employee = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={employeesRoutes} logout>
      <Switch>
        <Route exact path={`${url}/profile`} component={Profile} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/projects/:id`} component={ProjectPage} />
        <Route exact path={`${url}/projects/:id/:memberId`} component={MemberTimesheetPage} />
        <Route exact path={`${url}/time-sheet`} component={Timesheet} />
        <Route exact path={`${url}/time-sheet/:id`} component={Tasks} />
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default Employee;
