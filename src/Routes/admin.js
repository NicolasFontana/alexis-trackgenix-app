import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/Admin/Home';
import Layout from 'Components/Layout';
import Employees from 'Components/Admin/Employees';
import EmployeePage from 'Components/Admin/Employees/EmployeePage';
import Projects from 'Components/Admin/Projects';
import { faFolderClosed, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import ProjectPage from 'Components/Admin/Projects/ProjectPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;
const projects = <FontAwesomeIcon icon={faFolderClosed}></FontAwesomeIcon>;

const adminsRoutes = [
  { icon: home, name: 'Home', path: '/admin' },
  { icon: users, name: 'Employees', path: '/admin/employees' },
  { icon: projects, name: 'Projects', path: '/admin/projects' }
];

const Admin = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminsRoutes} logout>
      <Switch>
        <Route exact path={`${url}/employees`} component={Employees} />
        <Route exact path={`${url}/employees/:id`} component={EmployeePage} />
        <Route exact path={`${url}/projects`} component={Projects} />
        <Route exact path={`${url}/projects/:id`} component={ProjectPage} />
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default Admin;
