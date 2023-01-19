import { ButtonText, ConfirmModal, ErrorSuccessModal, Preloader, Table } from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from 'redux/tasks/thunks';
import { useParams, useHistory } from 'react-router-dom';
import styles from './tasks.module.css';
import { getAllTimesheets, putTimesheet } from 'redux/time-sheets/thunks';
import { getEmployees } from 'redux/employees/thunks';

function Tasks() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const timesheet = useSelector((state) => state.timesheets.listTimesheet).find(
    (timesheet) => timesheet._id === id
  );
  const employee = useSelector((state) => state.employees.list).find((employee) =>
    employee.timeSheets.find((timesheet) => timesheet._id === id)
  );
  const isLoading = useSelector((state) => state.timesheets.isLoading);
  // const tasks = useSelector((state) => state.tasks.list);
  // const period = timesheet?.createdAt?.slice(0, 7);
  // const currentDate = new Date().toISOString().slice(0, 7);
  const [showModalApprove, setShowModalApprove] = useState(false);
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  const [response, setResponse] = useState('');
  // const [idToEdit, setIdToEdit] = useState();

  let modalApprove;
  let modalErrorSuccess;

  useEffect(() => {
    dispatch(getAllTimesheets());
    dispatch(getTasks());
    dispatch(getEmployees());
  }, [!showModalApprove]);

  const history = useHistory();

  const approveTimesheet = () => {
    dispatch(
      putTimesheet(
        {
          approved: !timesheet.approved
        },
        id,
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

  return isLoading && !showModalApprove && !showModalErrorSuccess ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Tasks</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <ButtonText
        label="Go back to the timesheets"
        clickAction={() => history.goBack()}
      ></ButtonText>
      <h2 className={styles.title}>Tasks</h2>
      <div className={styles.box}>
        <h3>{`${employee?.firstName} ${employee?.lastName}`}</h3>
        <h4>Project: {timesheet?.projectId?.name}</h4>
        <p>Tasks for {timesheet?.createdAt?.slice(0, 7)} period</p>
        <p>Status: {timesheet?.approved ? 'Approved' : 'Not approved'}</p>
      </div>
      <div className={timesheet?.Task.length ? styles.divContainer : styles.divNoTable}>
        {modalApprove}
        {modalErrorSuccess}
        {timesheet?.Task.length ? (
          <>
            <ButtonText
              label={timesheet?.approved ? 'Remove approval' : 'Approve timesheet'}
              clickAction={() => {
                setShowModalApprove(true);
              }}
            ></ButtonText>
            <Table
              data={timesheet?.Task?.filter(
                (task) => task.taskId.createdAt?.slice(0, 7) === timesheet.createdAt?.slice(0, 7)
              ).map((task) => task.taskId)}
              headers={[
                'taskName',
                'createdAt',
                'updatedAt',
                'workedHours',
                'description',
                'status'
              ]}
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
          </>
        ) : (
          <p>No tasks have been uploaded for this timesheet</p>
        )}
      </div>
    </section>
  );
}

export default Tasks;
