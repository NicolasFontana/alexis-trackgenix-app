import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminsAdd from '../Admins/Add';
import AdminsEdit from '../Admins/Edit';
import Admins from '../Admins/index';
import Employees from '../Employees/index';
import EmployeeHome from '../Employees/Home';
import Home from '../Home/index';
import Projects from '../Projects';
import ProjectsAddMember from '../Projects/Form/AddMember/AddMember';
import ProjectsForm from '../Projects/Form/index';
import SuperAdminsAdd from '../SuperAdmins/Add';
import SuperAdminsEdit from '../SuperAdmins/Edit';
import SuperAdmins from '../SuperAdmins/index';
import TasksEdit from '../Tasks/Edit/Edit';
import TasksForm from '../Tasks/Form/Form';
import Tasks from '../Tasks/index';
import TimeSheets from '../TimeSheets';
import styles from './layout.module.css';
import { SideBar, Header, Footer } from 'Components/Shared';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.currentScreen}>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/admins" component={Admins} />
          <Route exact path="/admins/add" component={AdminsAdd} />
          <Route exact path="/admins/edit" component={AdminsEdit} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Route exact path="/super-admins/add" component={SuperAdminsAdd} />
          <Route exact path="/super-admins/edit" component={SuperAdminsEdit} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employee/home" component={EmployeeHome} />
          <Route exact path="/projects" component={Projects} />
          <Route exact path="/projects/form" component={ProjectsForm} />
          <Route exact path="/projects/addmembers" component={ProjectsAddMember} />
          <Route exact path="/time-sheets" component={TimeSheets} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/tasks/add" component={TasksForm} />
          <Route exact path="/tasks/edit" component={TasksEdit} />
          <Route exact path="/">
            <Redirect to="/home" />
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
