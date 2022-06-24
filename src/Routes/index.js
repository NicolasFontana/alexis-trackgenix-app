import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Preloader } from 'Components/Shared';

const Home = lazy(() => import('Components/Home'));
const AdminRoutes = lazy(() => import('./admin'));
const EmployeeRoutes = lazy(() => import('./employee'));

function Routes() {
  return (
    <Switch>
      <Suspense fallback={Preloader}>
        <Route path="/home" component={Home} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/employee" component={EmployeeRoutes} />
        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Suspense>
    </Switch>
  );
}

export default Routes;
