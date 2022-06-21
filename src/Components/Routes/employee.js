import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Employees/Home/index';
import Profile from 'Components/Employees/EditProfile';
import Timesheet from 'Components/Employees/Timesheet';
import Projects from 'Components/Employees/Projects';

const Employee = () => {
  return (
    <Switch>
      <Route path="/employee/home" component={Home} />
      <Route path="/employee/timesheet" component={Timesheet} />
      <Route path="/employee/projects" component={Projects} />
      <Route path="/employee/profile" component={Profile} />
      <Redirect to="/employee/home" />
    </Switch>
  );
};

export default Employee;
