// import { Link } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Welcome to Trackgenix</h2>
      {/* <div className={styles.currentScreen}>
        <div className={styles.buttonsContainer}>
          <button className={styles.linkButton}>
            <Link to="admin" className={styles.link}>
              Admin
            </Link>
          </button>
          <button className={styles.linkButton}>
            <Link to="employee" className={styles.link}>
              Employee
            </Link>
          </button>
          <button className={styles.linkButton}>
            <Link to="auth/login" className={styles.link}>
              LogIn
            </Link>
          </button>
          <button className={styles.linkButton}>
            <Link to="" className={styles.link}>
              SignUp
            </Link>
          </button>
        </div>
      </div> */}
    </section>
  );
}

export default Home;
