import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Profile from 'Components/Employee/EditProfile';
import Timesheet from 'Components/Employee/Timesheet';
import Projects from 'Components/Employee/Projects';

const Employee = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/`} component={Home} />
      <Route path={`${url}/time-sheet`} component={Timesheet} />
      <Route path={`${url}/projects`} component={Projects} />
      <Route path={`${url}/profile`} component={Profile} />
      <Redirect to={`${url}/`} />
    </Switch>
  );
};

export default Employee;
