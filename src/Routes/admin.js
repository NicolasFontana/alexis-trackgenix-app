import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Home from 'Components/Admin/Home';
import Layout from 'Components/Layout';
import Admins from 'Components/Admin/Admins';
import SuperAdmins from 'Components/Admin/SuperAdmins';
import Employees from 'Components/Admin/Employees';
import Projects from 'Components/Admin/Projects';
import Timesheets from 'Components/Admin/TimeSheets';
import Tasks from 'Components/Admin/Tasks';

const adminsRoutes = [
  { name: 'Home', path: '/admin/' },
  { name: 'Admins', path: '/admin/admins' },
  { name: 'Super-Admins', path: '/admin/super-admins' },
  { name: 'Employees', path: '/admin/employees' },
  { name: 'Projects', path: '/admin/projects' },
  { name: 'Time-Sheet', path: '/admin/time-sheets' },
  { name: 'Tasks', path: '/admin/tasks' }
];

const Admin = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes}>
      <Switch>
        <Route path={`${url}/admins`} component={Admins} />
        <Route path={`${url}/super-admins`} component={SuperAdmins} />
        <Route path={`${url}/employees`} component={Employees} />
        <Route path={`${url}/projects`} component={Projects} />
        <Route path={`${url}/time-sheets`} component={Timesheets} />
        <Route path={`${url}/tasks`} component={Tasks} />
        <Route exact path={`${url}/`} component={Home} />
      </Switch>
    </Layout>
  );
};

export default Admin;
