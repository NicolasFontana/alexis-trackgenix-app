import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import styles from './routes.module.css';
import { Header, Footer, Preloader } from 'Components/Shared';
import SideBarRoutes from './TemporarySidebar';

const Home = lazy(() => import('Components/Home'));
const AdminRoutes = lazy(() => import('./admin'));
const EmployeeRoutes = lazy(() => import('./employee'));

function Routes() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.currentScreen}>
        <Switch>
          <Suspense fallback={<Preloader />}>
            <Route path="/home" component={Home} />
            <Route path="/admin" component={AdminRoutes} />
            <Route path="/employee" component={EmployeeRoutes} />
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
}

export default Routes;
