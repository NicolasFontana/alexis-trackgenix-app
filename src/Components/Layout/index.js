import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminsAdd from '../Admins/Add';
import AdminsEdit from '../Admins/Edit';
import SuperAdmins from '../SuperAdmins/index';
import Home from '../Home/index';
import styles from './layout.module.css';
import Employees from '../Employees/index';
import EmployeeProfile from '../Employees/Profile';
import Projects from '../Projects';
import ProjectsForm from '../Projects/Form/index';
import ProjectsAddMember from '../Projects/Form/AddMember/AddMember';
import TimeSheets from '../TimeSheets';
import Tasks from '../Tasks/index';
import TasksForm from '../Tasks/Form/Form';
import Admins from '../Admins/index';
import Footer from '../Footer/index';
import Header from '../Header/index';
import SideBar from '../SideBar/index';
import TasksEdit from '../Tasks/Edit/Edit';

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
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employee/profile" component={EmployeeProfile} />
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
