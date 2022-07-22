import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, generatePath } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
<<<<<<< HEAD
import { getAllTimesheets } from 'redux/time-sheets/thunks';

=======
>>>>>>> c793c57a (TG-116: add empty tables logic)
import styles from './memberTimesheetPage.module.css';
import { Preloader, Table, ButtonText } from 'Components/Shared';

const MemberTimesheetPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id, memberId } = useParams();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const member = useSelector((state) => state.employees.list)?.find(
    (employee) => employee._id === memberId
  );
<<<<<<< HEAD
  const timesheets = useSelector((state) => state.timesheets.listTimesheet)?.filter(
    (timesheet) =>
      timesheet.projectId._id === id &&
      member?.timeSheets.some((memberTS) => memberTS._id === timesheet._id)
  );
=======
>>>>>>> c793c57a (TG-116: add empty tables logic)

  const redirectAction = (timesheetId) => {
    history.push(
      generatePath('/employee/projects/:id/members/:memberId/timesheets/:timesheetId', {
        id: id,
        memberId: memberId,
        timesheetId
      })
    );
  };

  useEffect(() => {
    dispatch(getEmployees());
<<<<<<< HEAD
    dispatch(getAllTimesheets());
=======
>>>>>>> c793c57a (TG-116: add empty tables logic)
  }, []);

  return isLoading ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Project</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <ButtonText
        label="Go back"
        clickAction={() => {
          history.push(generatePath('/employee/projects/:id', { id: id }));
        }}
      ></ButtonText>
<<<<<<< HEAD
      <h2>{`${member?.firstName} ${member?.lastName}`}</h2>
      <h3>Timesheets</h3>
      {timesheets.length ? (
        <Table
          data={timesheets}
          headers={['projectId', 'createdAt', 'Task', 'approved']}
          titles={['Project', 'Month', 'Worked hours', 'Approved']}
          modifiers={{
            projectId: (x) => x.name,
            createdAt: (x) => x?.slice(0, 7),
            Task: (x) =>
              x.reduce((previous, current) => {
                return previous + current.taskId.workedHours;
              }, 0),
=======
      <h2>Member Timesheets</h2>
      <h3>{`${member?.firstName} ${member?.lastName}`}</h3>
      {member?.timeSheets.length !== 0 ? (
        <Table
          data={member?.timeSheets}
          headers={['projectId', '', 'approved']}
          titles={['Project', 'Worked hours', 'Approved']}
          modifiers={{
            projectId: (x) => member.projects.find((project) => project._id === x).name,
>>>>>>> c793c57a (TG-116: add empty tables logic)
            approved: (x) => (x ? 'Approved' : 'Not approved')
          }}
          redirect={redirectAction}
        />
      ) : (
        <p>No timesheets have been uploaded for this project</p>
      )}
    </section>
  );
};

export default MemberTimesheetPage;
