import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, generatePath } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getAllTimesheets, putTimesheet } from 'redux/time-sheets/thunks';
import styles from './memberTasksPage.module.css';
import { Preloader, Table, ConfirmModal, ErrorSuccessModal, ButtonText } from 'Components/Shared';

const MemberTasksPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id, memberId, timesheetId } = useParams();
  const isLoadingEmployee = useSelector((state) => state.employees.isLoading);
  const isLoadingTimesheet = useSelector((state) => state.timesheets.isLoading);
  const member = useSelector((state) => state.employees.list)?.find(
    (employee) => employee._id === memberId
  );
  const timesheet = useSelector((state) => state.timesheets.listTimesheet)?.find(
    (timesheet) => timesheet._id === timesheetId
  );
  const [showModalApprove, setShowModalApprove] = useState(false);
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  const [response, setResponse] = useState('');
  const project = member?.projects.find((project) => project._id === id);
  let modalApprove;
  let modalErrorSuccess;

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getAllTimesheets());
  }, [!showModalApprove]);

  const approveTimesheet = () => {
    dispatch(
      putTimesheet(
        {
          approved: !timesheet.approved
        },
        timesheetId,
        setResponse
      )
    ).then(() => {
      setShowModalApprove(false);
      setModalErrorSuccess(true);
      document.body.style.overflow = 'hidden';
    });
  };

  if (showModalApprove) {
    modalApprove = (
      <ConfirmModal
        isOpen={showModalApprove}
        handleClose={() => {
          setShowModalApprove(false);
        }}
        confirmDelete={approveTimesheet}
        title={timesheet?.approved ? 'Remove approval' : 'Approve timesheet'}
        message={`Are you sure you want to ${
          timesheet?.approved ? 'remove approval for' : 'approve'
        } this timesheet?`}
      />
    );
  }

  if (showModalErrorSuccess) {
    modalErrorSuccess = (
      <ErrorSuccessModal
        show={showModalErrorSuccess}
        closeModal={() => {
          setModalErrorSuccess(false);
          document.body.style.overflow = 'unset';
        }}
        closeModalForm={() => {
          setModalErrorSuccess(false);
          document.body.style.overflow = 'unset';
        }}
        successResponse={response}
      ></ErrorSuccessModal>
    );
  }

  return (isLoadingEmployee || isLoadingTimesheet) &&
    !showModalApprove &&
    !showModalErrorSuccess ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Tasks</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <ButtonText
        label="Go back to timesheets"
        clickAction={() => {
          history.push(
            generatePath('/employee/projects/id=:id/members/id=:memberId', {
              id: id,
              memberId: memberId
            })
          );
        }}
      ></ButtonText>
      <h2 className={styles.title}>Tasks</h2>
      <div className={styles.box}>
        <h3>{`${member?.firstName} ${member?.lastName}`}</h3>
        <h4>Project: {project?.name}</h4>
        <p>Timesheet for {timesheet?.createdAt?.slice(0, 7)} period</p>
        <p>Status: {timesheet?.approved ? 'Approved' : 'Not approved'}</p>
      </div>
      {timesheet?.Task.length ? (
        <div className={styles.divContainer}>
          {modalApprove}
          {modalErrorSuccess}
          <ButtonText
            label={timesheet?.approved ? 'Remove approval' : 'Approve timesheet'}
            clickAction={() => {
              setShowModalApprove(true);
            }}
          ></ButtonText>
          <Table
            data={timesheet?.Task.map((task) => task.taskId)}
            headers={['taskName', 'createdAt', 'updatedAt', 'workedHours', 'description', 'status']}
            titles={[
              'Task Name',
              'Created at',
              'Updated at',
              'Worked Hours',
              'Description',
              'Status'
            ]}
            modifiers={{
              createdAt: (x) => x?.slice(0, 10),
              updatedAt: (x) => x?.slice(0, 10)
            }}
            sort={{
              taskName: 1,
              createdAt: 1,
              updatedAt: 1,
              workedHours: 1,
              description: 1,
              status: 1
            }}
            sortModifiers={{
              createdAt: (x) => x?.slice(0, 10),
              updatedAt: (x) => x?.slice(0, 10)
            }}
          />
        </div>
      ) : (
        <p>No tasks have been uploaded for this timesheet</p>
      )}
    </section>
  );
};

export default MemberTasksPage;
