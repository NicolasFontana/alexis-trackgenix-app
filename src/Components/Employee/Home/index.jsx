import styles from './home.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.data);
  const employee = useSelector((state) => state.employees.list)?.find((e) => e._id === user._id);

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return (
    <section className={styles.container}>
      <h2>
        Welcome {employee?.firstName} {employee?.lastName}
      </h2>
    </section>
  );
}

export default Home;
