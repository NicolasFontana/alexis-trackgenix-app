import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.main}>
        <div className={styles.appName}>
          Track<span>GENIX</span>
        </div>
        <ul className={styles.rutes}>
          <li>
            <a href="/admins">admins</a>
          </li>
          <li>
            <a href="/super-admins">super admins</a>
          </li>
          <li>
            <a href="/employees">employees</a>
          </li>
          <li>
            <a href="/projects">projects</a>
          </li>
          <li>
            <a href="/time-sheets">timesheets</a>
          </li>
          <li>
            <a href="/tasks">tasks</a>
          </li>
        </ul>
      </div>
      <div className={styles.license}>
        <div className={styles.copyright}>Copyright © 2022 Trackgenix</div>
      </div>
    </footer>
  );
}

export default Footer;
