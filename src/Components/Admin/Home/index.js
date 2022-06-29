import { useSelector } from 'react-redux';
import styles from 'Components/Employee/Home/home.module.css';

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
