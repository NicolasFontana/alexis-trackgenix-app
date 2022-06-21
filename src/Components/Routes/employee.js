import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Employees/Home/index';
import Profile from 'Components/Employees/EditProfile';
import Timesheet from 'Components/Employees/Timesheet';
import Projects from 'Components/Employees/Projects';

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
