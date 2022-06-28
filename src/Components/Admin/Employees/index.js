import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, deleteEmployee } from 'redux/employees/thunks';
import styles from './employees.module.css';
import Form from './Form';
import {
  Preloader,
  Table,
  ModalForm,
  ButtonAdd,
  ConfirmModal,
  ErrorSuccessModal
} from 'Components/Shared';

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showModalFormDelete, setShowModalFormDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [employeeId, setEmployeeId] = useState();

  useEffect(() => {
    dispatch(getEmployees());
  }, [showModalFormAdd === false, showModalFormDelete === false, showModalFormEdit === false]);

  const closeModalFormAdd = () => {
    setShowModalFormAdd(false);
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  let modalEdit;
  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Employee">
        <Form
          closeModalForm={closeModalFormEdit}
          edit={true}
          item={employees.find((item) => item._id === employeeId)}
        />
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
        handleClose={() => {
          setShowModalFormDelete(false);
        }}
        confirmDelete={() => {
          dispatch(deleteEmployee(employeeId, setResponse)).then(() => {
            setShowModalFormDelete(false);
            setShowSuccessModal(true);
          });
        }}
        title="Delete Employee"
        message={'Are you sure you want to delete this employee?'}
      />
    );
  }

  return isLoading &&
    !showModalFormEdit &&
    !showModalFormAdd &&
    !showModalFormDelete &&
    !showSuccessModal ? (
    <Preloader>
      <p>Loading Employees</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.employees}> Employees </h2>
      <Table
        data={employees}
        headers={[
          '_id',
          'firstName',
          'lastName',
          'phone',
          'email',
          'isProjectManager',
          'active',
          'projects',
          'timeSheets'
        ]}
        titles={[
          'ID',
          'First Name',
          'Last Name',
          'Phone',
          'Email',
          'PM',
          'Active',
          'Projects',
          'Timesheets'
        ]}
        delAction={(id) => {
          setEmployeeId(id);
          setShowModalFormDelete(true);
        }}
        editAction={(id) => {
          setEmployeeId(id);
          setShowModalFormEdit(true);
        }}
      />
      {modalEdit}
      {modalAdd}
      {modalDelete}
      {isLoading ? <Preloader /> : null}
      <ButtonAdd
        clickAction={() => {
          setShowModalFormAdd(true);
        }}
      />
      <ErrorSuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={() => {
          setShowSuccessModal(false);
        }}
        successResponse={response}
      />
    </section>
  );
};

export default Employees;
