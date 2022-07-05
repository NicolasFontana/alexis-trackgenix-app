import styles from './home.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins } from 'redux/admins/thunks';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.data);

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  return (
    <section className={styles.container}>
      <h2>
        Welcome {user?.firstName} {user?.lastName}
      </h2>
    </section>
  );
}

export default Home;
