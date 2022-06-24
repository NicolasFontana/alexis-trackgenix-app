import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import Tasks from '../Tasks/index';
import TimeSheets from '../TimeSheets';
import { Header, Footer } from 'Components/Shared';
import SideBarAdmin from '../SideBarAdmin/index';
import SideBarE from '../SideBarEmployee/index';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.currentScreen}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/time-sheets" component={TimeSheets} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </div>
      <Footer />
      <div className={styles.sidebar}>
        <SideBarE />
        <Route exact path="/admin" component={SideBarAdmin} />
      </div>
    </div>
  );
}

export default Layout;
