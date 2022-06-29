import styles from './home.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getAllTimesheets } from 'redux/time-sheets/thunks';

function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user?.data);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
    dispatch(getAllTimesheets());
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
