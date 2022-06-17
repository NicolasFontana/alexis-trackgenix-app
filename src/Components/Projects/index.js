import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, getProjects } from '../../redux/projects/thunks';
import AddForm from '../Projects/Addform/addForm';
import ButtonAdd from '../Shared/Buttons/ButtonAdd';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import ModalErrorSuccess from '../Shared/ErrorSuccessModal';
import ModalForm from '../Shared/ModalForm';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import styles from './projects.module.css';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [showModalAdd, setModalAdd] = useState(false);
  const [showErrorSuccessModal, setErrorSuccessModal] = useState(false);
  const [projectId, setProjectId] = useState(0);
  const [message, setMessage] = useState('');

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

  const deleteItem = () => {
    dispatch(deleteProject(projectId, (message) => setMessage(message)));
    closeConfirmModal();
    setErrorSuccessModal(true);
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
        <AddForm closeModalForm={closeModalAdd} />
      </ModalForm>
    );
  }

  if (showErrorSuccessModal) {
    modalErrorSuccess = (
      <ModalErrorSuccess
        show={showErrorSuccessModal}
        closeModal={closeErrorSuccessModal}
        closeModalForm={closeConfirmModal}
        successResponse={message}
      ></ModalErrorSuccess>
    );
  }

  return isLoading && !showModalAdd && !showConfirmModal ? (
    <Preloader>
      <p>Loading projects</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.projects}> Projects </h2>
      {modalDelete}
      {modalAdd}
      {modalErrorSuccess}
      <Table
        data={projects}
        headers={['name', 'description', 'startDate', 'endDate', 'clientName', 'active', 'members']}
        titles={[
          'Name',
          'Description',
          'Start Date',
          'End Date',
          'Client Name',
          'Active',
          'Members'
        ]}
        delAction={openConfirmModal}
      />
      <ButtonAdd clickAction={openModalAdd}></ButtonAdd>
    </section>
  );
};

export default Projects;
