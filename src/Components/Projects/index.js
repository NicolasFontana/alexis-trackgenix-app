import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ModalForm from '../Shared/ModalForm';
import Form from './Form';
import AddMember from './Form/AddMember/AddMember';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from '../../redux/projects/thunks';

const Projects = () => {
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  let [value, setValue] = useState(false);

  const isLoading = useSelector((state) => state.projects.isLoading);
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
    setValue(false);
  };

  const openModalFormEdit = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  useEffect(() => {
    dispatch(getProjects());
    setValue(false);
  }, []);

  const deleteItem = () => {
    console.log('delete function disabled');
  };

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

  return isLoading && !showModalFormEdit ? (
    <Preloader />
  ) : (
    <section className={styles.container}>
      <h2 className={styles.projects}> Projects </h2>
      <Table
        data={projects}
        headers={['name', 'clientName', 'startDate', 'endDate', 'active', 'description', 'members']}
        titles={[
          'Name',
          'Client name',
          'Start date',
          'End date',
          'Active',
          'Description',
          'Members'
        ]}
        delAction={deleteItem}
        editAction={openModalFormEdit}
      />
      {modalEdit}
      {isLoading ? <Preloader /> : null}
      <a>
        <button className={styles.addbtn}>&#10010;</button>
      </a>
    </section>
  );
};

export default Projects;
