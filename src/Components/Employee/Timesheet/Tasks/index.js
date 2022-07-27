import {
  ButtonText,
  ConfirmModal,
  ErrorSuccessModal,
  ModalForm,
  Preloader,
  Table
} from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delTask, getTasks } from 'redux/tasks/thunks';
import { useParams, useHistory } from 'react-router-dom';
import Form from './Form/Form';
import styles from './tasks.module.css';
import { getAllTimesheets, putTimesheet } from 'redux/time-sheets/thunks';

function Tasks() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const timesheet = useSelector((state) => state.timesheets.listTimesheet).find(
    (timesheet) => timesheet._id === id
  );
  const isLoading = useSelector((state) => state.timesheets.isLoading);
  const tasks = useSelector((state) => state.tasks.list);
  const period = timesheet?.createdAt?.slice(0, 7);
  const currentDate = new Date().toISOString().slice(0, 7);
  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [taskResponse, setTaskResponse] = useState('');
  const [timesheetResponse, setTimesheetResponse] = useState('');
  const [idDelete, setIdDelete] = useState(0);
  const [idToEdit, setIdToEdit] = useState();

  let modalEdit;
  let modalAdd;
  let modalMessage;

  useEffect(() => {
    dispatch(getAllTimesheets());
    dispatch(getTasks());
  }, [showModalFormEdit === false && showModalFormAdd === false && showConfirmModal === false]);

  const history = useHistory();

  const deleteTask = () => {
    const tasksFiltered = timesheet.Task.filter((task) => task.taskId._id !== idDelete).map(
      (task) => ({ taskId: task.taskId._id })
    );
    dispatch(delTask(idDelete, setTaskResponse))
      .then(dispatch(putTimesheet({ Task: tasksFiltered }, id, setTimesheetResponse)))
      .then(() => {
        closeModal();
        setShowConfirmModal(false);
        setShowMessageModal(true);
      });
  };

  const openConfirmModal = (id) => {
    setShowConfirmModal(true);
    setIdDelete(id);
  };

  const openAddModal = () => {
    setShowModalFormAdd(true);
  };

  const openEditModal = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  const closeModal = () => {
    setShowMessageModal(false);
    setShowModalFormAdd(false);
    setShowModalFormEdit(false);
    setShowConfirmModal(false);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModal} title="Edit Task">
        <Form
          closeModalForm={closeModal}
          task={tasks.find((task) => task._id === idToEdit)}
          edit={true}
        />
      </ModalForm>
    );
  }

  if (showModalFormAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalFormAdd} handleClose={closeModal} title="Add Task">
        <Form closeModalForm={closeModal} timesheet={timesheet} />
      </ModalForm>
    );
  }

  if (showConfirmModal) {
    modalMessage = (
      <ConfirmModal
        isOpen={showConfirmModal}
        handleClose={closeModal}
        confirmDelete={deleteTask}
        title="Delete Task"
        message="¿Are you sure you want to delete the task?"
      />
    );
  }

  const redirect = (taskId) => {
    if (taskId) {
      history.push(`/employee/time-sheet/${id}/${taskId}`);
    } else {
      history.push('/employee/time-sheet');
    }
  };

  return isLoading &&
    !showModalFormEdit &&
    !showModalFormAdd &&
    !showMessageModal &&
    !showConfirmModal ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Tasks</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <ButtonText label="Go back to the timesheets" clickAction={() => redirect()}></ButtonText>
      <h2 className={styles.title}>Tasks</h2>
      <div className={styles.box}>
        <h4>Project: {timesheet?.projectId?.name}</h4>
        <p>Tasks for {timesheet?.createdAt?.slice(0, 7)} period</p>
      </div>
      <div className={styles.divContainer}>
        {modalEdit}
        {modalAdd}
        {modalMessage}

        {currentDate === period && (
          <ButtonText label="Add Task" clickAction={() => openAddModal()}></ButtonText>
        )}
        {timesheet?.Task.length ? (
          <Table
            data={timesheet?.Task?.filter(
              (task) => task.taskId.createdAt?.slice(0, 7) === timesheet.createdAt?.slice(0, 7)
            ).map((task) => task.taskId)}
            headers={['taskName', 'createdAt', 'updatedAt', 'workedHours', 'description', 'status']}
            titles={[
              'Task Name',
              'Created at',
              'Updated at',
              'Worked Hours',
              'Description',
              'Status'
            ]}
            delAction={openConfirmModal}
            editAction={openEditModal}
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
          />
        ) : (
          <p>No tasks have been uploaded for this timesheet</p>
        )}
      </div>
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModal}
        successResponse={{
          message: `${taskResponse.message}.\n${timesheetResponse.message}.`,
          data: taskResponse.data,
          error: taskResponse.error
        }}
      />
    </section>
  );
}

export default Tasks;
