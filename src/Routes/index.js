import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { tokenListener } from 'helper/firebase';
import PrivateRoute from 'Routes/PrivateRoute';
import { Header, Footer, Preloader } from 'Components/Shared';
import SideBarRoutes from './TemporarySidebar';
import styles from './routes.module.css';

const Home = lazy(() => import('Components/Home'));
const AdminRoutes = lazy(() => import('Routes/admin'));
const EmployeeRoutes = lazy(() => import('Routes/employee'));
const AuthRoutes = lazy(() => import('Routes/auth'));

const Routes = () => {
  useEffect(() => {
    tokenListener();
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.currentScreen}>
        <Switch>
          <Suspense fallback={<Preloader />}>
            <Route path="/home" component={Home} />
            <Route path="/admin" role="ADMIN" component={AdminRoutes} />
            <PrivateRoute path="/employee" role="EMPLOYEE" component={EmployeeRoutes} />
            <Route path="/auth" component={AuthRoutes} />
            <Route exact path="/" />
          </Suspense>
        </Switch>
      </div>
      <Footer />
      <div className={styles.sidebar}>
        <SideBarRoutes titles={['Admin', 'Employee']} directions={['/admin', '/employee']} />
      </div>
    </div>
  );
};

export default Routes;
