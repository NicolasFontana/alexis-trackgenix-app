import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../Header/index';
import Footer from '../Footer/index';
import Admins from '../Admins/index';
import AdminsAdd from '../Admins/Add';
import AdminsEdit from '../Admins/Edit';
import SuperAdmins from '../SuperAdmins/index';
import SuperAdminsAdd from '../SuperAdmins/Add';
import SuperAdminsEdit from '../SuperAdmins/Edit';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form/index';
import ProjectsAddMember from '../Projects/Form/AddMember/AddMember';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form/Form';
import TasksEdit from '../Tasks/Edit/Edit';

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/admins" component={AdminsAdd} />
        <Route exact path="/admins/add" component={AdminsEdit} />
        <Route exact path="/admins/edit" component={Admins} />
        <Route exact path="/super-admins" component={SuperAdmins} />
        <Route exact path="/super-admins/add" component={SuperAdminsAdd} />
        <Route exact path="/super-admins/edit" component={SuperAdminsEdit} />
        <Route exact path="/employees" component={Employees} />
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
      <Footer />
    </div>
  );
}

export default Layout;
