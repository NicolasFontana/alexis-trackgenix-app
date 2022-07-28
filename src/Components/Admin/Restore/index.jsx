import { ConfirmModal, ErrorSuccessModal, Preloader, Table, ButtonText } from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedEmployees, restoreEmployee, removeEmployee } from 'redux/employees/thunks';
import { getDeletedProjects, updateProject, removeProject } from 'redux/projects/thunks';
import { getDeletedTimesheets, putTimesheet } from 'redux/time-sheets/thunks';
import { getDeletedTasks, editTask } from 'redux/tasks/thunks';
import styles from './restore.module.css';

const Restore = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const projects = useSelector((state) => state.projects.list);
  const timesheets = useSelector((state) => state.timesheets.listTimesheet);
  const tasks = useSelector((state) => state.tasks.list);
  const isLoadingEmployees = useSelector((state) => state.employees.isLoading);
  const isLoadingProjects = useSelector((state) => state.projects.isLoading);
  const isLoadingTimesheets = useSelector((state) => state.timesheets.isLoading);
  const isLoadingTasks = useSelector((state) => state.tasks.isLoading);
  const [showModalFormRestore, setShowModalFormRestore] = useState(false);
  const [showModalFormRemove, setShowModalFormRemove] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [itemId, setItemId] = useState();
  const [table, setTable] = useState('');

  let modalRestore;
  let modalRemove;
  let modalErrorSuccess;

  useEffect(() => {
    dispatch(getDeletedEmployees());
    dispatch(getDeletedProjects());
    dispatch(getDeletedTimesheets());
    dispatch(getDeletedTasks());
  }, [!showModalFormRestore, !showModalFormRemove]);

  const handleRestore = () => {
    let restoreDispatch;
    switch (table) {
      case 'Employees':
        restoreDispatch = restoreEmployee(itemId, setResponse);
        break;
      case 'Projects':
        restoreDispatch = updateProject(itemId, { isDeleted: false }, setResponse);
        break;
      case 'Timesheets':
        restoreDispatch = putTimesheet({ isDeleted: false }, itemId, setResponse);
        break;
      case 'Tasks':
        restoreDispatch = editTask({ isDeleted: false }, itemId, setResponse);
        break;
    }
    dispatch(restoreDispatch).then(() => {
      setShowModalFormRestore(false);
      setShowSuccessModal(true);
    });
  };

  const handleRemove = () => {
    let removeDispatch;
    switch (table) {
      case 'Employees':
        removeDispatch = removeEmployee(itemId, setResponse);
        break;
      case 'Projects':
        removeDispatch = removeProject(itemId, setResponse);
        break;
      case 'Timesheets':
        removeDispatch = putTimesheet({ isDeleted: false }, itemId, setResponse);
        break;
      case 'Tasks':
        removeDispatch = editTask({ isDeleted: false }, itemId, setResponse);
        break;
    }
    dispatch(removeDispatch).then(() => {
      setShowModalFormRemove(false);
      setShowSuccessModal(true);
    });
  };

  const openConfirmModalRestore = (id) => {
    setItemId(id);
    setShowModalFormRestore(true);
  };

  const openConfirmModalRemove = (id) => {
    setItemId(id);
    setShowModalFormRemove(true);
  };

  const closeErrorSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (showModalFormRestore) {
    modalRestore = (
      <ConfirmModal
        isOpen={showModalFormRestore}
        handleClose={() => {
          setShowModalFormRestore(false);
        }}
        confirmDelete={handleRestore}
        title={`Restore ${table}`}
        message={`Are you sure you want to restore this ${table.slice(0, -1).toLowerCase()}?`}
      />
    );
  }

  if (showModalFormRemove) {
    modalRestore = (
      <ConfirmModal
        isOpen={showModalFormRemove}
        handleClose={() => {
          setShowModalFormRemove(false);
        }}
        confirmDelete={handleRemove}
        title={`Remove ${table}`}
        message={`Are you sure you want to finally remove this ${table
          .slice(0, -1)
          .toLowerCase()}?`}
      />
    );
  }

  if (showSuccessModal) {
    modalErrorSuccess = (
      <ErrorSuccessModal
        show={showSuccessModal}
        closeModal={closeErrorSuccessModal}
        closeModalForm={closeErrorSuccessModal}
        successResponse={response}
      />
    );
  }

  return isLoadingEmployees &&
    isLoadingProjects &&
    isLoadingTasks &&
    isLoadingTimesheets &&
    !showModalFormRestore &&
    !showModalFormRemove &&
    !showSuccessModal ? (
    <Preloader>
      <p>Loading Data</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      {modalRestore}
      {modalRemove}
      {modalErrorSuccess}
      {isLoadingEmployees || isLoadingProjects || isLoadingTasks || isLoadingTimesheets ? (
        <Preloader />
      ) : null}
      <h2 className={styles.title}>Deleted {table}</h2>
      <div className={styles.buttons}>
        <ButtonText label="Employees" clickAction={() => setTable('Employees')} />
        <ButtonText label="Projects" clickAction={() => setTable('Projects')} />
        <ButtonText label="Timesheets" clickAction={() => setTable('Timesheets')} />
        <ButtonText label="Tasks" clickAction={() => setTable('Tasks')} />
      </div>
      {table === 'Employees' && employees.length ? (
        <Table
          data={employees}
          headers={['firstName', 'lastName', 'phone', 'email', 'active']}
          titles={['First Name', 'Last Name', 'Phone', 'Email', 'Active']}
          modifiers={{
            active: (x) => (x ? 'Active' : 'Inactive')
          }}
          editAction={openConfirmModalRestore}
          delAction={openConfirmModalRemove}
          sort={{ firstName: 1, lastName: 1, phone: 1, email: 1, active: 1 }}
        />
      ) : null}
      {table === 'Projects' && projects.length ? (
        <Table
          data={projects}
          headers={['name', 'clientName', 'startDate', 'endDate', 'active']}
          titles={['Project name', 'Client', 'Start Date', 'End Date', 'Active']}
          modifiers={{
            startDate: (x) => x.slice(0, 10),
            endDate: (x) => (x ? x.slice(0, 10) : 'To be defined'),
            active: (x) => (x ? 'Active' : 'Inactive')
          }}
          editAction={openConfirmModalRestore}
          delAction={openConfirmModalRemove}
          sort={{ name: 1, clientName: 1, members: 1, startDate: 1, endDate: 1, active: 1 }}
          sortModifiers={{
            members: (x) => x.find((member) => member.role === 'PM')?.employeeId.firstName
          }}
        />
      ) : null}
      {table === 'Timesheets' && timesheets.length ? (
        <Table
          data={timesheets}
          headers={['projectId', 'approved', 'Task', 'createdAt']}
          titles={['Project', 'PMs approval', 'Worked hours', 'Period']}
          modifiers={{
            projectId: (x) => x?.name,
            approved: (x) => (x ? 'Approved' : 'Not approved'),
            Task: (x) =>
              x?.reduce((previous, current) => {
                return previous + current.taskId.workedHours;
              }, 0),
            createdAt: (x) => x?.slice(0, 7)
          }}
          editAction={openConfirmModalRestore}
          delAction={openConfirmModalRemove}
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
      ) : null}
      {table === 'Tasks' && tasks.length ? (
        <Table
          data={tasks}
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
          editAction={openConfirmModalRestore}
          delAction={openConfirmModalRemove}
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
      ) : null}
    </section>
  );
};

export default Restore;
