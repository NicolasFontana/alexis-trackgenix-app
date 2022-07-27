import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer, SideBar } from 'Components/Shared';
import styles from './layout.module.css';

function Layout(props) {
  const { routes, logout } = props;
  const [sidebar, setSidebar] = useState(false);

  const history = useHistory();

  useEffect(() => {
    return history.listen(() => {
      setSidebar(false);
    });
  }, [history]);

  const sidebarOpenClose = (state) => {
    setSidebar(!state);
  };

  return (
    <div className={styles.container}>
      <Header sidebarOpener={sidebarOpenClose} />
      <SideBar state={sidebar} routes={routes} logout={logout} />
      <div className={styles.currentScreen}>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
