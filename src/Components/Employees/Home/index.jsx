import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTimesheets } from '../../../redux/time-sheets/thunks';
import { getEmployees } from '../../../redux/employees/thunks';
import styles from './home.module.css';
import Preloader from '../../Shared/Preloader/Preloader';
import Table from '../../Shared/Table/Table';
import ButtonText from '../../Shared/Buttons/ButtonText';
import Select from '../../Shared/Select';

const EmployeeHome = () => {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === '62996ab1b89dc4b653576647'
  );
  const timesheets = useSelector((state) => state.timesheets.list);
  const isLoading = useSelector((state) => state.employees.isLoading);

  useEffect(() => {
    dispatch(getTimesheets());
    dispatch(getEmployees());
  }, []);

  return isLoading ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <h2 className={styles.employees}>{`${employee.firstName} ${employee.lastName}`} </h2>
      <Table
        data={timesheets}
        headers={[]}
        titles={[]}
        modifiers={{
          firstName: (x) => <ButtonText label={x}></ButtonText>,
          active: (x) => (x === true ? 'Active' : 'Inactive'),
          isProjectManager: (x) => (x === true ? 'Yes' : 'No'),
          // projects: (x) => x.length,
          projects: (x) => <Select data={[...x.map((project) => project.name)]} />,
          timeSheets: (x) => x.length
        }}
      />
    </section>
  );
};

export default EmployeeHome;
