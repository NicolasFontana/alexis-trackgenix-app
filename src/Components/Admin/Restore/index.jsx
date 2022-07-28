import { ConfirmModal, ErrorSuccessModal, Preloader, Table } from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedEmployees, restoreEmployee, removeEmployee } from 'redux/employees/thunks';
import styles from './restore.module.css';

const Restore = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const [showModalFormRestore, setShowModalFormRestore] = useState(false);
  const [showModalFormRemove, setShowModalFormRemove] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [employeeId, setEmployeeId] = useState();

  let modalRestore;
  let modalRemove;
  let modalErrorSuccess;

  useEffect(() => {
    dispatch(getDeletedEmployees());
  }, [!showModalFormRestore, !showModalFormRemove]);

  const handleRestore = () => {
    dispatch(restoreEmployee(employeeId, setResponse)).then(() => {
      setShowModalFormRestore(false);
      setShowSuccessModal(true);
    });
  };

  const handleRemove = () => {
    dispatch(removeEmployee(employeeId, setResponse)).then(() => {
      setShowModalFormRemove(false);
      setShowSuccessModal(true);
    });
  };

  const openConfirmModalRestore = (id) => {
    setEmployeeId(id);
    setShowModalFormRestore(true);
  };

  const openConfirmModalRemove = (id) => {
    setEmployeeId(id);
    setShowModalFormRemove(true);
  };

  const closeErrorSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (showModalFormRestore) {
    modalRestore = (
      <ConfirmModal
        isOpen={showModalFormRestore}
        handleClose={() => {
          setShowModalFormRestore(false);
        }}
        confirmDelete={handleRestore}
        title="Restore Employee"
        message="Are you sure you want to restore this employee?"
      />
    );
  }

  if (showModalFormRemove) {
    modalRestore = (
      <ConfirmModal
        isOpen={showModalFormRemove}
        handleClose={() => {
          setShowModalFormRemove(false);
        }}
        confirmDelete={handleRemove}
        title="Remove Employee"
        message="Are you sure you want to finally remove this employee?"
      />
    );
  }

  if (showSuccessModal) {
    modalErrorSuccess = (
      <ErrorSuccessModal
        show={showSuccessModal}
        closeModal={closeErrorSuccessModal}
        closeModalForm={closeErrorSuccessModal}
        successResponse={response}
      />
    );
  }

  return isLoading && !showModalFormRestore && !showModalFormRemove && !showSuccessModal ? (
    <Preloader>
      <p>Loading Data</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      {modalRestore}
      {modalRemove}
      {modalErrorSuccess}
      {isLoading ? <Preloader /> : null}
      <h2 className={styles.title}>Deleted Employees</h2>
      <Table
        data={employees}
        headers={['firstName', 'lastName', 'phone', 'email', 'active']}
        titles={['First Name', 'Last Name', 'Phone', 'Email', 'Active']}
        editAction={openConfirmModalRestore}
        delAction={openConfirmModalRemove}
        sort={{ firstName: 1, lastName: 1, phone: 1, email: 1, active: 1 }}
      />
    </section>
  );
};

export default Restore;
