import { Header, Footer, SideBar } from 'Components/Shared';
import styles from './layout.module.css';

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
