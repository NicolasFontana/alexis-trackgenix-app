import styles from './home.module.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className={styles.container}>
      <h2>Home</h2>
      <div>
        <Link to="/admin">Admin</Link>
        <Link to="/employee">Employee</Link>
      </div>
    </section>
  );
}

export default Home;
