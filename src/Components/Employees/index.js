import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ModalForm from '../Shared/ModalForm';
import Form from './Form';

const Employees = () => {
  const [list, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState();

  const closeModalForm = () => {
    setShowModalFormAdd(false);
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      });
  }, [showModalFormAdd, showModalFormEdit]);

  const openModalFormEdit = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  const deleteItem = async (_id) => {
    if (confirm(`Are you sure you want to delete this employee?`)) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/employees/${_id}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error(error);
      }
      setEmployees([...list.filter((listItem) => listItem._id !== _id)]);
    }
  };
  let modalEdit;
  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Employee">
        <Form closeModalForm={closeModalFormEdit} edit={true} itemId={idToEdit} />
      </ModalForm>
    );
  }
  let modalAdd;
  if (showModalFormAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalFormAdd} handleClose={closeModalForm} title="Add Employee">
        <Form closeModalForm={closeModalForm} />
      </ModalForm>
    );
  }

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
      {modalEdit}
      {modalAdd}
      <button
        className={styles.addbtn}
        onClick={() => {
          setShowModalFormAdd(true);
        }}
      >
        &#10010;
      </button>
    </section>
  );
};

export default Employees;
