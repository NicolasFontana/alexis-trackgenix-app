import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import { useHistory, generatePath } from 'react-router-dom';
import {
  Preloader,
  Table,
  ModalForm,
  ConfirmModal,
  ErrorSuccessModal,
  ButtonText
} from 'Components/Shared';
import Form from './Form';
import styles from './projects.module.css';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [showModalAdd, setModalAdd] = useState(false);
  const [showErrorSuccessModal, setErrorSuccessModal] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [message, setMessage] = useState('');

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
  };

  const closeErrorSuccessModal = () => {
    setErrorSuccessModal(false);
  };

  useEffect(() => {
    dispatch(getProjects());
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
    dispatch(deleteProject(projectId, (message) => setMessage(message))).then(() => {
      closeConfirmModal();
      setErrorSuccessModal(true);
    });
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
        successResponse={message}
      ></ErrorSuccessModal>
    );
  }

  return isLoading && !showModalAdd && !showConfirmModal && !showModalFormEdit ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Projects</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.projects}> Projects </h2>
      {modalEdit}
      {modalDelete}
      {modalAdd}
      {modalErrorSuccess}
      <div className={styles.divContainer}>
        <ButtonText label="ADD PROJECT" clickAction={openModalAdd}></ButtonText>
        <Table
          data={projects}
          headers={['name', 'clientName', 'projectManager', 'description', 'startDate', 'active']}
          titles={['Project name', 'Client', 'PM', 'Description', 'Start Date', 'Active']}
          modifiers={{
            startDate: (x) => x.slice(0, 10),
            active: (x) => (x ? 'Active' : 'Inactive'),
            projectManager: (x) => (x ? x : 'Not selected')
          }}
          delAction={openConfirmModal}
          editAction={openModalFormEdit}
          redirect={redirectAction}
        />
      </div>
    </section>
  );
};

export default Projects;
