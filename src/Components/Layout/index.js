import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './layout.module.css';
import { SideBar, Header, Footer, Preloader } from 'Components/Shared';

const Home = lazy(() => import('Components/Home'));
const Admins = lazy(() => import('Components/Admins'));
const SuperAdmins = lazy(() => import('Components/SuperAdmins'));
const Employees = lazy(() => import('Components/Employees'));
const Projects = lazy(() => import('Components/Projects'));
const TimeSheets = lazy(() => import('Components/TimeSheets'));
const Tasks = lazy(() => import('Components/Tasks'));

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.currentScreen}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/admins" component={Admins} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Suspense fallback={Preloader}>
            <Route path="/employee" component={Employees} />
          </Suspense>
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/time-sheets" component={TimeSheets} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/">
            <Redirect to="/employee" />
          </Route>
        </Switch>
      </div>
      <Footer />
      <div className={styles.sidebar}>
        <SideBar />
      </div>
    </div>
  );
}

export default Layout;
