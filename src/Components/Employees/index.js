import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ModalForm from '../Shared/ModalForm';
import Form from './Form';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import ButtonAdd from '../Shared/Buttons/ButtonAdd';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from '../../redux/employees/thunks';

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.employees.isLoading);
  // const [list, setEmployees] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showModalFormDelete, setShowModalFormDelete] = useState(false);
  const [employeeId, setEmployeeId] = useState();

  const closeModalFormAdd = () => {
    setShowModalFormAdd(false);
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  const closeModalFormDelete = () => {
    setShowModalFormDelete(false);
  };

  useEffect(() => {
    dispatch(getEmployees());
    // setLoading(false);
    // fetch(`${process.env.REACT_APP_API_URL}/api/employees`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setEmployees(response.data);
    //   });
  }, [showModalFormAdd, showModalFormEdit, showModalFormDelete]);

  const openModalFormEdit = (id) => {
    setEmployeeId(id);
    setShowModalFormEdit(true);
  };

  const openModalFormDelete = (id) => {
    setEmployeeId(id);
    setShowModalFormDelete(true);
  };

  const deleteItem = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/employees/${employeeId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
    setShowModalFormDelete(false);
  };

  let modalEdit;
  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Employee">
        <Form closeModalForm={closeModalFormEdit} edit={true} itemId={employeeId} />
      </ModalForm>
    );
  }

  let modalAdd;
  if (showModalFormAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalFormAdd} handleClose={closeModalFormAdd} title="Add Employee">
        <Form closeModalForm={closeModalFormAdd} />
      </ModalForm>
    );
  }

  let modalDelete;
  if (showModalFormDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalFormDelete}
        handleClose={closeModalFormDelete}
        confirmDelete={deleteItem}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
      />
    );
  }

  return isLoading ? (
    <Preloader>
      <p>Loading employees</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.employees}> Employees </h2>
      <Table
        // data={list}
        data={employees}
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
        delAction={openModalFormDelete}
        editAction={openModalFormEdit}
      />
      {modalEdit}
      {modalAdd}
      {modalDelete}
      <ButtonAdd
        clickAction={() => {
          setShowModalFormAdd(true);
        }}
      />
    </section>
  );
};

export default Employees;
