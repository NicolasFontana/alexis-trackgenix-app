import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Admins/Home';
import Admins from 'Components/Admins/index';
import SuperAdmins from 'Components/SuperAdmins/index';
import Employees from 'Components/Employees/index';
import Projects from 'Components/Projects/index';
import Timesheets from 'Components/TimeSheets/index';
import Tasks from 'Components/Tasks/index';

const Admin = () => {
  const { url } = useRouteMatch();
  console.log('ASD', url);
  return (
    <Switch>
      <Route path={`${url}/admins`} component={Admins} />
      <Route path={`${url}/super-admins`} component={SuperAdmins} />
      <Route path={`${url}/employees`} component={Employees} />
      <Route path={`${url}/projects`} component={Projects} />
      <Route path={`${url}/time-sheets`} component={Timesheets} />
      <Route path={`${url}/tasks`} component={Tasks} />
      <Route exact path={`${url}/`} component={Home} />
    </Switch>
  );
};

export default Admin;
