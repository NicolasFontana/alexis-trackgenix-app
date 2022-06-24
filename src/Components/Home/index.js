import { Link } from 'react-router-dom';
import Layout from '../Layout';
import styles from './home.module.css';

function Home() {
  return (
    <Layout>
      <section className={styles.container}>
        <h2>Home</h2>
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
        </div>
      </section>
    </Layout>
  );
}

export default Home;
