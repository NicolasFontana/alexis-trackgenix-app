import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Employee/Home';
import Profile from 'Components/Employee/EditProfile';
import Timesheet from 'Components/Employee/Timesheet';
import Projects from 'Components/Employee/Projects';

const Admin = () => {
  return (
    <Switch>
      <Route path="/admin/home" component={Home} />
      <Route path="/admin/timesheet" component={Timesheet} />
      <Route path="/admin/projects" component={Projects} />
      <Route path="/admin/profile" component={Profile} />
      <Redirect to="/admin/home" />
    </Switch>
  );
};

export default Admin;
