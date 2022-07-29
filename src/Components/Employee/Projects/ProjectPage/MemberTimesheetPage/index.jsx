import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, generatePath } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getAllTimesheets } from 'redux/time-sheets/thunks';
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
  const timesheets = useSelector((state) => state.timesheets.listTimesheet)?.filter(
    (timesheet) =>
      timesheet.projectId?._id === id &&
      member?.timeSheets.some((memberTS) => memberTS._id === timesheet._id)
  );
  const project = member?.projects.find((project) => project._id === id);

  const redirectAction = (timesheetId) => {
    history.push(
      generatePath('/employee/projects/id=:id/members/id=:memberId/timesheets/id=:timesheetId', {
        id: id,
        memberId: memberId,
        timesheetId
      })
    );
  };

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAllTimesheets());
  }, []);

  return isLoading ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Timesheets</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <ButtonText
        label={`Go back to ${project?.name}`}
        clickAction={() => {
          history.push(generatePath('/employee/projects/id=:id', { id: id }));
        }}
      ></ButtonText>
      <h2 className={styles.title}>Timesheets</h2>
      <h3>{`${member?.firstName} ${member?.lastName}`}</h3>
      {timesheets?.length ? (
        <Table
          data={timesheets}
          headers={['projectId', 'createdAt', 'Task', 'approved']}
          titles={['Project', 'Period', 'Worked hours', 'Approved']}
          modifiers={{
            projectId: (x) => x.name,
            createdAt: (x) => x?.slice(0, 7),
            Task: (x) =>
              x.reduce((previous, current) => {
                return previous + current.taskId?.workedHours;
              }, 0),
            approved: (x) => (x ? 'Approved' : 'Not approved')
          }}
          redirect={redirectAction}
          sort={{ projectId: 1, approved: 1, Task: 1, createdAt: 1 }}
          sortModifiers={{
            projectId: (x) => x?.name,
            Task: (x) =>
              x?.reduce((previous, current) => {
                return previous + current.taskId.workedHours;
              }, 0),
            createdAt: (x) => x?.slice(0, 7)
          }}
        />
      ) : (
        <p>No timesheets have been uploaded for this project</p>
      )}
    </section>
  );
};

export default MemberTimesheetPage;
