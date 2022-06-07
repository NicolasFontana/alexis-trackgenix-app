import Admins from '../Admins/index';
import Employees from '../Employees/index';
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Projects from '../Projects';
import AddMember from '../Projects/Form/AddMember/AddMember';
import ProjectsForm from '../Projects/Form/index';
import SideBar from '../SideBar/index';
import SuperAdminsAdd from '../SuperAdmins/Add';
import SuperAdminsEdit from '../SuperAdmins/Edit';
import SuperAdmins from '../SuperAdmins/index';
import TaskEdit from '../Tasks/Edit/Edit';
import TaskForm from '../Tasks/Form/Form';
import Tasks from '../Tasks/index';
import TimeSheets from '../TimeSheets';
import styles from './layout.module.css';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/super-admins':
      currentScreen = <SuperAdmins />;
      break;
    case '/super-admins/add':
      currentScreen = <SuperAdminsAdd />;
      break;
    case '/super-admins/edit':
      currentScreen = <SuperAdminsEdit />;
      break;
    case '/employees':
      currentScreen = <Employees />;
      break;
    case '/projects':
      currentScreen = <Projects />;
      break;
    case '/projects/form':
      currentScreen = <ProjectsForm />;
      break;
    case '/projects/addmembers':
      currentScreen = <AddMember />;
      break;
    case '/time-sheets':
      currentScreen = <TimeSheets />;
      break;
    case '/tasks':
      currentScreen = <Tasks />;
      break;
    case '/tasks/add':
      currentScreen = <TaskForm />;
      break;
    case '/tasks/edit':
      currentScreen = <TaskEdit />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.currentScreen}>{currentScreen}</div>
      <Footer />
      <div className={styles.sidebar}>
        <SideBar />
      </div>
    </div>
  );
}

export default Layout;
