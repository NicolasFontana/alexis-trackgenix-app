import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../../redux/employees/thunks';
import styles from './profile.module.css';
import Preloader from '../../Shared/Preloader/Preloader';
import ButtonText from '../../Shared/Buttons/ButtonText';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === '62996ab1b89dc4b653576647'
  );
  const isLoading = useSelector((state) => state.employees.isLoading);

  const edit = () => {
    console.log('Edit Profile');
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const status = employee?.active ? 'Active' : 'Inactive';
  const isPM = employee?.isProjectManager ? 'Yes' : 'No';

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <h2 className={styles.title}>Profile</h2>
      <div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Name:</h3>
          <p className={styles.rowText}>{`${employee?.firstName} ${employee?.lastName}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Phone:</h3>
          <p className={styles.rowText}>{`${employee?.phone}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Email:</h3>
          <p className={styles.rowText}>{`${employee?.email}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Status:</h3>
          <p className={styles.rowText}>{`${status}`}</p>
        </div>
        <div className={styles.row}>
          <h3 className={styles.rowTitle}>Is Project Manager:</h3>
          <p className={styles.rowText}>{`${isPM}`}</p>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <ButtonText clickAction={edit} label="Edit profile"></ButtonText>
      </div>
    </section>
  );
};

export default EmployeeProfile;
