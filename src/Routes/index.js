import React, { Suspense, lazy, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { tokenListener } from 'helper/firebase';
import { getMe } from 'redux/auth/thunks';
import PrivateRoute from 'Routes/PrivateRoute';
import Layout from 'Components/Layout';
import { Preloader } from 'Components/Shared';

const MainHomeRoutes = lazy(() => import('./home'));
const AdminRoutes = lazy(() => import('./admin'));
const EmployeeRoutes = lazy(() => import('./employee'));
const AuthRoutes = lazy(() => import('./auth'));

const Routes = () => {
  const token = useSelector((store) => store.auth.authenticated?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [token]);

  return (
    <Switch>
      <Suspense
        fallback={
          <Layout>
            <Preloader />
          </Layout>
        }
      >
        <Route path="/home" component={MainHomeRoutes} />
        <PrivateRoute path="/admin" role="ADMIN" component={AdminRoutes} />
        <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeRoutes} />
        <Route path="/auth" component={AuthRoutes} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Suspense>
    </Switch>
  );
};

export default Routes;
