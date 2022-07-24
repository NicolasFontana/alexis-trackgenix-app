import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'Components/Shared';
import { useHistory } from 'react-router-dom';
import styles from './time-sheet.module.css';
import { useEffect } from 'react';
import { getAllTimesheets } from 'redux/time-sheets/thunks';
import { getEmployees } from 'redux/employees/thunks';

function Timesheet() {
  const dispatch = useDispatch();
  const employeeId = useSelector((state) => state.auth.user?.data._id);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === employeeId
  );
  const timesheets = useSelector((state) => state.timesheets.listTimesheet).filter(
    (listTimesheet) =>
      employee?.timeSheets.some((employeeTimesheet) => employeeTimesheet._id === listTimesheet._id)
  );

  const history = useHistory();

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAllTimesheets());
  }, []);

  const redirect = (id) => {
    history.push(`/employee/time-sheet/${id}`);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employee Timesheets</h2>
      <Table
        data={timesheets}
        headers={['projectId', 'approved', 'Task']}
        titles={['Project', 'PMs approval', 'Worked hours']}
        modifiers={{
          projectId: (x) => x.name,
          approved: (x) => (x ? 'Approved' : 'Not approved'),
          Task: (x) =>
            x.reduce((previous, current) => {
              return previous + current.taskId.workedHours;
            }, 0)
        }}
        redirect={redirect}
      />
    </section>
  );
}

export default Timesheet;
