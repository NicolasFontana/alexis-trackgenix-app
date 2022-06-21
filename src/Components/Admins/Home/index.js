import styles from 'Components/Home/home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={styles.container}>
      <h2>Admin Home</h2>
      <div className={styles.buttonsContainer}>
        <button className={styles.linkButton}>
          <Link to="/home" className={styles.link}>
            Home
          </Link>
        </button>
        <button className={styles.linkButton}>
          <Link to="/admin/admins" className={styles.link}>
            Admins
          </Link>
        </button>
        <button className={styles.linkButton}>
          <Link to="/admin/super-admins" className={styles.link}>
            Super Admins
          </Link>
        </button>
        <button className={styles.linkButton}>
          <Link to="/admin/employees" className={styles.link}>
            Employees
          </Link>
        </button>
        <button className={styles.linkButton}>
          <Link to="/admin/projects" className={styles.link}>
            Projects
          </Link>
        </button>
        <button className={styles.linkButton}>
          <Link to="/admin/time-sheets" className={styles.link}>
            TimeSheets
          </Link>
        </button>
        <button className={styles.linkButton}>
          <Link to="/admin/tasks" className={styles.link}>
            Tasks
          </Link>
        </button>
      </div>
    </section>
  );
}

export default Home;
