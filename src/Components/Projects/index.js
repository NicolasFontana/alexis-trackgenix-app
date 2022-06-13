import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ModalForm from '../Shared/ModalForm';
import Form from './Form';
import AddMember from './Form/AddMember/AddMember';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState();
  let [value, setValue] = useState(false);

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  const openModalFormEdit = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => response.json())
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      });
    setValue(false);
  }, [showModalFormEdit]);

  const deleteItem = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${_id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
    setProjects([...projects.filter((listItem) => listItem._id !== _id)]);
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
            itemId={idToEdit}
            functionValue={functionValue}
          />
        )}
      </ModalForm>
    );
  }

  return loading ? (
    <Preloader>
      <p>Loading projects</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.projects}> Projects </h2>
      <Table
        data={projects}
        headers={[
          '_id',
          'name',
          'clientName',
          'startDate',
          'endDate',
          'active',
          'description',
          'members'
        ]}
        titles={['ID', 'Name', 'Clien name', 'start', 'end', 'Active', 'Description', 'Members']}
        delAction={deleteItem}
        editAction={openModalFormEdit}
      />
      {modalEdit}
      <a href={'/projects/form'}>
        <button className={styles.addbtn}>&#10010;</button>
      </a>
    </section>
  );
};

export default Projects;
