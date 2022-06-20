import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../../redux/employees/thunks';
import styles from './profile.module.css';
import Preloader from '../../Shared/Preloader/Preloader';
import ButtonText from '../../Shared/Buttons/ButtonText';

const EmployeeProfile = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  // const employee1 = employees.find((employee) => employee._id === '62996ab1b89dc4b653576647');
  const isLoading = useSelector((state) => state.employees.isLoading);
  console.log(employees);

  // const status = employee1.active ? 'Active' : 'Inactive';
  // const isPM = employee1.isProjectManager ? 'Yes' : 'No';

  const edit = () => {
    console.log('Edit Profile');
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <h2 className={styles.title}>Profile</h2>
      <div>
        {/* <h3>Name: {`${employee1.firstName} ${employee1.lastName}`}</h3>
        <h3>Phone: {`${employee1.phone}`}</h3>
        <h3>Email: {`${employee1.email}`}</h3>
        <h3>Status: {`${status}`}</h3>
        <h3>Is Project Manager: {`${isPM}`}</h3> */}
      </div>
      <ButtonText clickAction={edit} label="Edit profile"></ButtonText>
    </section>
  );
};

export default EmployeeProfile;
