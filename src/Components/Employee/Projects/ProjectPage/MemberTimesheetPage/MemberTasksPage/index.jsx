import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, generatePath } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getAllTimesheets } from 'redux/time-sheets/thunks';
import styles from './memberTasksPage.module.css';
import {
  Preloader,
  Table,
  // ModalForm,
  // ConfirmModal,
  // ErrorSuccessModal,
  ButtonText
} from 'Components/Shared';

const MemberTasksPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id, memberId, timesheetId } = useParams();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const member = useSelector((state) => state.employees.list)?.find(
    (employee) => employee._id === memberId
  );
  const timesheet = useSelector((state) => state.timesheets.listTimesheet)?.find(
    (timesheet) => timesheet._id === timesheetId
  );

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAllTimesheets());
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
          history.push(
            generatePath('/employee/projects/:id/members/:memberId', { id: id, memberId: memberId })
          );
        }}
      ></ButtonText>
      <h2>{`${member?.firstName} ${member?.lastName}`}</h2>
      <h3>Project: {member?.projects.find((project) => project._id === id).name}</h3>
      <p>Timesheet for {timesheet?.createdAt?.slice(0, 7)}</p>
      {timesheet?.Task.length ? (
        <Table
          data={timesheet?.Task.map((task) => task.taskId)}
          headers={['taskName', 'description', 'startDate', 'status', 'workedHours']}
          titles={['Task Name', 'Description', 'Start Date', 'Status', 'Worked Hours']}
          modifiers={{
            startDate: (x) => x?.slice(0, 10)
          }}
        />
      ) : (
        <p>No tasks have been uploaded for this timesheet</p>
      )}
    </section>
  );
};

export default MemberTasksPage;
