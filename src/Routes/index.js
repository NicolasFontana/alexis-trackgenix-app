import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';
import PrivateRoute from 'Routes/PrivateRoute';
import { Preloader } from 'Components/Shared';

const Home = lazy(() => import('./home'));
const AdminRoutes = lazy(() => import('./admin'));
const EmployeeRoutes = lazy(() => import('./employee'));
const AuthRoutes = lazy(() => import('./auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <Switch>
      <Suspense fallback={<Preloader />}>
        <Route path="/home" component={Home} />
        <Route path="/admin" role="ADMIN" component={AdminRoutes} />
        <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeRoutes} />
        <Route path="/auth" component={AuthRoutes} />
        <Route exact path="/" />
      </Suspense>
    </Switch>
  );
};

export default Routes;
