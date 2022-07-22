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
import { delTask } from 'redux/tasks/thunks';
import { useParams, useHistory } from 'react-router-dom';
import EditForm from './Edit/Edit';
import Form from './Form/Form';
import styles from './tasks.module.css';
import { getAllTimesheets, putTimesheet } from 'redux/time-sheets/thunks';

function Tasks() {
  let { id } = useParams();
  id = id.substring(1);
  const dispatch = useDispatch();
  //Here we save all the data of the clicked timesheet
  const timesheet = useSelector((state) => state.timesheets.listTimesheet).find(
    (timesheet) => timesheet._id === id
  );
  const isLoading = useSelector((state) => state.timesheets.isLoading);

  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [idDelete, setIdDelete] = useState(0);
  const [idToEdit, setIdToEdit] = useState();

  let modalEdit;
  let modalAdd;
  let modalMessage;

  useEffect(() => {
    dispatch(getAllTimesheets());
  }, []);

  const history = useHistory();
  let tasks = [];
  let month;

  console.log(timesheet.Task[0]);
  console.log(tasks);
  tasks.concat(timesheet.Task);
  console.log(tasks);

  const handleConfirm = () => {
    const tasksFiltered = timesheet.Task.filter((task) => task.taskId._id !== idDelete);
    let editedTimesheet = {
      projectId: timesheet.projectId,
      tasks: tasksFiltered,
      approved: timesheet.approved
    };
    if (id === 0) {
      dispatch(delTask(idDelete, (response) => setMessage(response))).then(() => {
        closeModal();
        setShowConfirmModal(false);
        setShowMessageModal(true);
      });
      dispatch(putTimesheet(editedTimesheet, id, setMessage));
    }
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
        <EditForm closeModalForm={closeModal} task={tasks.find((item) => item._id === idToEdit)} />
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
        confirmDelete={handleConfirm}
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
      {modalEdit}
      {modalAdd}
      {modalMessage}
      {isLoading ? <Preloader /> : null}
      <h2>Tasks of {month}</h2>
      <ButtonText label="Go back" clickAction={() => redirect()}></ButtonText>
      <ButtonText label="Add Task" clickAction={() => openAddModal()}></ButtonText>
      <Table
        data={tasks}
        headers={['taskName', 'startDate', 'workedHours', 'description', 'status']}
        titles={['Task Name', 'Start Date', 'Worked Hours', 'Description', 'Status']}
        delAction={openConfirmModal}
        editAction={openEditModal}
        modifiers={{
          startDate: (x) => x?.slice(0, 10)
        }}
      />
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModal}
        successResponse={message}
      />
    </section>
  );
}

export default Tasks;

// const onSubmit = (data) => {
//   let dataToSave;
//   dispatch(
//     createTask(
//       Datos de la task
//       (message) => (setMessage(message), (dataToSave = message.data))
//     )
//   ).then(() => {
//     setShowMessageModal(true);
//     let body = JSON.stringify({
//       tasks: timeSheet.task.map((task) => task._id).concat(dataToSave._id)
//     });
//     dispatch(updateTask(body, taskId, setMessage)).then(() => {
//       setShowMessageModal(true);
//     });
//   });
// };
