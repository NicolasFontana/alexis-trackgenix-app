import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import Home from 'Components/SuperAdmin/Home';
import Layout from 'Components/Layout';
import Admins from 'Components/SuperAdmin/Admins';
import Restore from 'Components/SuperAdmin/Restore';
import { faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const home = <FontAwesomeIcon icon={faHouse}></FontAwesomeIcon>;
const users = <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>;

const superAdminsRoutes = [
  { icon: home, name: 'Home', path: '/super-admin' },
  { icon: users, name: 'Admins', path: '/super-admin/admins' },
  { icon: users, name: 'Restore', path: '/super-admin/restore' }
];

const SuperAdmin = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={superAdminsRoutes} logout>
      <Switch>
        <Route exact path={`${url}/admins`} component={Admins} />
        <Route exact path={`${url}/restore`} component={Restore} />
        <Route exact path={`${url}/`} component={Home} />
        <Redirect to={`${url}`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdmin;
