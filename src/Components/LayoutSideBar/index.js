import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import styles from './layout.module.css';
import SideBar from '../Shared/SidebarEmployee/index';

function Layout(props) {
  const { routes } = props;
  return (
    <div className={styles.container}>
      <Header />
      {props.children}
      <SideBar routes={routes} />
      <Footer />
    </div>
  );
}

export default Layout;
