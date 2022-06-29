import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Preloader } from 'Components/Shared';
import styles from './routes.module.css';

const Home = lazy(() => import('./home'));
const AdminRoutes = lazy(() => import('./admin'));
const EmployeeRoutes = lazy(() => import('./employee'));
const Error404 = lazy(() => import('Components/Error404'));

function Routes() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<Preloader />}>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/admin" component={AdminRoutes} />
          <Route path="/employee" component={EmployeeRoutes} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/*" component={Error404} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default Routes;
