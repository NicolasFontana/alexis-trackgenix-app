import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ModalForm from '../Shared/ModalForm';
import Form from './Form';

const Employees = () => {
  const [list, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      });
  }, [showModalForm, showModalFormEdit]);

  const closeModalForm = () => {
    setShowModalForm(false);
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  const openModalFormEdit = (id) => {
    setShowModalFormEdit(true);
    setIdToEdit(id);
  };

  const deleteItem = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/employees/${_id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
    setEmployees([...list.filter((listItem) => listItem._id !== _id)]);
  };

  return loading ? (
    <Preloader>
      <p>Loading employees</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.employees}> Employees </h2>
      <Table
        data={list}
        headers={[
          '_id',
          'firstName',
          'lastName',
          'phone',
          'email',
          'active',
          'isProjectManager',
          'projects',
          'timeSheets'
        ]}
        titles={[
          'ID',
          'Name',
          'Surname',
          'Phone',
          'Email',
          'Active',
          'Project Manager',
          'Projects',
          'TimeSheets'
        ]}
        delAction={deleteItem}
        editAction={openModalFormEdit}
      />
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Employee">
        <Form closeModalForm={closeModalFormEdit} edit={true} itemId={idToEdit} />
      </ModalForm>
      <ModalForm isOpen={showModalForm} handleClose={closeModalForm} title="Add Employee">
        <Form closeModalForm={closeModalForm} />
      </ModalForm>
      <button
        className={styles.addbtn}
        onClick={() => {
          setShowModalForm(true);
        }}
      >
        &#10010;
      </button>
    </section>
  );
};

export default Employees;
