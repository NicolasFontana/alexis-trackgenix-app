import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from 'redux/projects/thunks';
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
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [showModalAdd, setModalAdd] = useState(false);
  const [showErrorSuccessModal, setErrorSuccessModal] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [message, setMessage] = useState('');

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  const openModalFormEdit = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  const openModalAdd = () => {
    setModalAdd(true);
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

  const closeModalAdd = () => {
    setModalAdd(false);
  };

  const closeErrorSuccessModal = () => {
    setErrorSuccessModal(false);
  };

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  let modalEdit;

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Project">
        <Form
          closeModalForm={closeModalFormEdit}
          edit={true}
          project={projects.find((project) => project._id == idToEdit)}
          projectID={idToEdit}
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

  let modalDelete;
  let modalAdd;
  let modalErrorSuccess;

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
      {isLoading ? <Preloader /> : null}
      <div className={styles.divContainer}>
        <ButtonText label="ADD PROJECT" clickAction={openModalAdd}></ButtonText>
        <Table
          data={projects}
          headers={['name', 'clientName', 'projectManager', 'description', 'startDate', 'active']}
          titles={['Project name', 'Client', 'PM', 'Description', 'Start Date', 'Active']}
          modifiers={{
            startDate: (x) => x.slice(0, 10),
            active: (x) => (x ? 'Active' : 'Inactive')
          }}
          delAction={openConfirmModal}
          editAction={openModalFormEdit}
        />
      </div>
    </section>
  );
};

export default Projects;
