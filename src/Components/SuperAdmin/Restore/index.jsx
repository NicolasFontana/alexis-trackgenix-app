import { ConfirmModal, ErrorSuccessModal, Preloader, Table } from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedAdmins, restoreAdmin, removeAdmin } from 'redux/admins/thunks';
import styles from './restore.module.css';

const Admins = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);
  const [showModalFormRestore, setShowModalFormRestore] = useState(false);
  const [showModalFormRemove, setShowModalFormRemove] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [adminId, setAdminId] = useState();

  let modalRestore;
  let modalRemove;
  let modalErrorSuccess;

  useEffect(() => {
    dispatch(getDeletedAdmins());
  }, [!showModalFormRestore, !showModalFormRemove]);

  const handleRestore = () => {
    dispatch(restoreAdmin(adminId, setResponse)).then(() => {
      setShowModalFormRestore(false);
      setShowSuccessModal(true);
    });
  };

  const handleRemove = () => {
    dispatch(removeAdmin(adminId, setResponse)).then(() => {
      setShowModalFormRemove(false);
      setShowSuccessModal(true);
    });
  };

  const openConfirmModalRestore = (id) => {
    setAdminId(id);
    setShowModalFormRestore(true);
  };

  const openConfirmModalRemove = (id) => {
    setAdminId(id);
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
        title="Restore Admin"
        message="Are you sure you want to restore this admin?"
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
        title="Remove Admin"
        message="Are you sure you want to finally remove this admin?"
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

  return isLoading && !showModalFormRestore && !showSuccessModal ? (
    <Preloader>
      <p>Loading Admins</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      {modalRestore}
      {modalRemove}
      {modalErrorSuccess}
      {isLoading ? <Preloader /> : null}
      <h2 className={styles.title}>Deleted Admins</h2>
      <Table
        data={admins}
        headers={['firstName', 'lastName', 'email']}
        titles={['First Name', 'Last Name', 'Email']}
        editAction={openConfirmModalRestore}
        delAction={openConfirmModalRemove}
        sort={{ firstName: 1, lastName: 1, email: 1 }}
      />
    </section>
  );
};

export default Admins;
