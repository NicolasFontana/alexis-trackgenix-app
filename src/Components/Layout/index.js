import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import styles from './layout.module.css';
import SideBar from 'Components/Shared/Sidebar';

function Layout(props) {
  const { routes, logout } = props;
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.currentScreen}>{props.children}</div>
      <SideBar routes={routes} logout={logout} />
      <Footer />
    </div>
  );
}

export default Layout;
