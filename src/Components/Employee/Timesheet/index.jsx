import { useSelector } from 'react-redux';
import { Table } from 'Components/Shared';
import styles from './time-sheet.module.css';

function Timesheet() {
  const employeeId = '62996ab1b89dc4b653576647';

  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === employeeId
  );
  const timesheets = useSelector((state) => state.timesheets.listTimesheet).filter(
    (listTimesheet) =>
      employee.timeSheets.some((employeeTimesheet) => employeeTimesheet._id === listTimesheet._id)
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employee Timesheets</h2>
      <Table
        data={timesheets}
        headers={['projectId', 'approved', 'Task']}
        titles={['Project', 'PMs approval', 'Worked hours']}
        modifiers={{
          projectId: (x) => x.name,
          approved: (x) => (x === true ? 'Approved' : 'Not approved'),
          Task: (x) =>
            x.reduce((previous, current) => {
              return previous + current.taskId.workedHours;
            }, 0)
        }}
      />
    </section>
  );
}

export default Timesheet;
