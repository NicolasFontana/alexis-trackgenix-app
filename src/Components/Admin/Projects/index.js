import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import {
  Preloader,
  Table,
  ModalForm,
  ButtonAdd,
  ConfirmModal,
  ErrorSuccessModal,
  Select
} from 'Components/Shared';
import Form from './Form';
import AddMember from './Form/AddMember/AddMember';
import AddForm from './Addform/addForm';
import styles from './projects.module.css';

const Projects = () => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  let [value, setValue] = useState(false);
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
    setValue(false);
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
    setValue(false);
  }, []);

  const functionValue = (value) => {
    setValue(value);
  };

  let modalEdit;

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm
        isOpen={showModalFormEdit}
        handleClose={closeModalFormEdit}
        title={value ? 'Add/Edit team members' : 'Edit Project'}
      >
        {value ? (
          <AddMember functionValue={functionValue} projects={projects} itemId={idToEdit} />
        ) : (
          <Form
            closeModalForm={closeModalFormEdit}
            edit={true}
            project={projects.find((project) => project._id == idToEdit)}
            itemId={idToEdit}
            functionValue={functionValue}
          />
        )}
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
        <AddForm closeModalForm={closeModalAdd} />
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
    <Preloader>
      <p>Loading Projects</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.projects}> Projects </h2>
      {modalEdit}
      {modalDelete}
      {modalAdd}
      {modalErrorSuccess}
      {isLoading ? <Preloader /> : null}
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
        modifiers={{
          startDate: (x) => x.slice(0, 10),
          endDate: (x) => x.slice(0, 10),
          active: (x) => (x ? 'Active' : 'Inactive'),
          members: (x) => (
            <Select
              title="Members"
              defaultValue=""
              data={[
                ...x.map(
                  (member) => `${member.employeeId?.firstName} ${member.employeeId?.lastName}`
                )
              ]}
              disabled
              register={console.log}
            />
          )
        }}
        delAction={openConfirmModal}
        editAction={openModalFormEdit}
      />
      <ButtonAdd clickAction={openModalAdd}></ButtonAdd>
    </section>
  );
};

export default Projects;
