import styles from './header.module.css';

const Header = ({ children }) => {
  return (
    <header>
      <div className={styles.appName}>
        <h2>Trackgenix</h2>
      </div>
      <div className={styles.title}>{children}</div>
    </header>
  );
};

export default Header;
