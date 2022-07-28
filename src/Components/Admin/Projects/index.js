import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import { getEmployees, updateEmployee } from 'redux/employees/thunks';
import { useHistory, generatePath } from 'react-router-dom';
import {
  Preloader,
  Table,
  ModalForm,
  ConfirmModal,
  ErrorSuccessModal,
  ButtonText,
  ScrollToTop
} from 'Components/Shared';
import Form from './Form';
import styles from './projects.module.css';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const employees = useSelector((state) => state.employees.list);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [showModalAdd, setModalAdd] = useState(false);
  const [showErrorSuccessModal, setErrorSuccessModal] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [message, setMessage] = useState('');
  const [responseEmployee, setResponseEmployee] = useState('');

  let modalEdit;
  let modalDelete;
  let modalAdd;
  let modalErrorSuccess;
  let history = useHistory();

  const redirectAction = (id) => {
    history.push(generatePath('/admin/projects/:id', { id }));
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  const openModalFormEdit = (id) => {
    setProjectId(id);
    setShowModalFormEdit(true);
  };

  const openModalAdd = () => {
    setModalAdd(true);
  };

  const closeModalAdd = () => {
    setModalAdd(false);
  };

  const openConfirmModal = (_id) => {
    setConfirmModal(true);
    setProjectId(_id);
  };

  const closeConfirmModal = () => {
    setConfirmModal(false);
    setErrorSuccessModal(false);
    setModalAdd(false);
    document.body.style.overflow = 'unset';
  };

  const closeErrorSuccessModal = () => {
    setErrorSuccessModal(false);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getEmployees());
  }, [showModalFormEdit === false, showModalAdd === false, showConfirmModal === false]);

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Project">
        <Form
          closeModalForm={closeModalFormEdit}
          edit={true}
          project={projects.find((project) => project._id == projectId)}
          projectID={projectId}
        />
      </ModalForm>
    );
  }

  const deleteItem = () => {
    dispatch(deleteProject(projectId, (message) => setMessage(message)))
      .then(() => {
        closeConfirmModal();
        setErrorSuccessModal(true);
        document.body.style.overflow = 'hidden';
      })
      .then(
        employees
          .filter((employee) => employee.projects.some((project) => project._id === projectId))
          .map((employee) =>
            dispatch(
              updateEmployee(
                JSON.stringify({
                  projects: employee.projects
                    .filter((employeeProject) => employeeProject._id != projectId)
                    .map((project) => project._id)
                }),
                employee._id,
                setResponseEmployee
              )
            )
          )
      );
  };

  if (showConfirmModal) {
    modalDelete = (
      <ConfirmModal
        isOpen={showConfirmModal}
        handleClose={closeConfirmModal}
        confirmDelete={deleteItem}
        title="Delete Project"
        message="Are you sure you want to delete this project?"
      />
    );
  }

  if (showModalAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalAdd} handleClose={closeModalAdd} title="Add Project">
        <Form closeModalForm={closeModalAdd} />
      </ModalForm>
    );
  }

  if (showErrorSuccessModal) {
    modalErrorSuccess = (
      <ErrorSuccessModal
        show={showErrorSuccessModal}
        closeModal={closeErrorSuccessModal}
        closeModalForm={closeConfirmModal}
        successResponse={{
          message:
            responseEmployee === ''
              ? message.message
              : `${message.message}\n${responseEmployee.message}`,
          data: message.data,
          error: message.error
        }}
      ></ErrorSuccessModal>
    );
  }

  return isLoading &&
    !showModalAdd &&
    !showConfirmModal &&
    !showModalFormEdit &&
    !showErrorSuccessModal ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Projects</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      {modalEdit}
      {modalDelete}
      {modalAdd}
      {modalErrorSuccess}
      <h2 className={styles.projects}> Projects </h2>
      <div className={styles.divContainer}>
        <ButtonText label="ADD PROJECT" clickAction={openModalAdd}></ButtonText>
      </div>
      <Table
        data={projects}
        headers={['name', 'clientName', 'members', 'startDate', 'endDate', 'active']}
        titles={['Project name', 'Client', 'PM', 'Start Date', 'End Date', 'Active']}
        modifiers={{
          members: (x) => {
            let pm = x.find((member) => member.role === 'PM');
            return pm ? `${pm.employeeId?.firstName} ${pm.employeeId?.lastName}` : 'To be defined';
          },
          startDate: (x) => x.slice(0, 10),
          endDate: (x) => (x ? x.slice(0, 10) : 'To be defined'),
          active: (x) => (x ? 'Active' : 'Inactive')
        }}
        delAction={openConfirmModal}
        editAction={openModalFormEdit}
        redirect={redirectAction}
        sort={{ name: 1, clientName: 1, members: 1, startDate: 1, endDate: 1, active: 1 }}
        sortModifiers={{
          members: (x) => x.find((member) => member.role === 'PM')?.employeeId.firstName
        }}
      />
      <ScrollToTop />
    </section>
  );
};

export default Projects;
