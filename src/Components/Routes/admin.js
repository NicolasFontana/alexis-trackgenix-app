import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from 'Components/Admins/Home';
import Admins from 'Components/Admins';
import SuperAdmins from 'Components/SuperAdmins';
import Employees from 'Components/Employees';
import Projects from 'Components/Projects';
import Timesheets from 'Components/TimeSheets';
import Tasks from 'Components/Tasks';

const Admin = () => {
  return (
    <Switch>
      <Route path="/admin/home" component={Home} />
      <Route path="/admin/admins" component={Admins} />
      <Route path="/admin/super-admins" component={SuperAdmins} />
      <Route path="/admin/employees" component={Employees} />
      <Route path="/admin/projects" component={Projects} />
      <Route path="/admin/time-sheets" component={Timesheets} />
      <Route path="/admin/tasks" component={Tasks} />
      <Redirect to="/admin/home" />
    </Switch>
  );
};

export default Admin;
