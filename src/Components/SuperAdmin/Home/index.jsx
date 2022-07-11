import styles from './home.module.css';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((state) => state.auth.user?.data);

  return (
    <section className={styles.container}>
      <h2>
        Welcome {user?.firstName} {user?.lastName}
      </h2>
    </section>
  );
}

export default Home;
