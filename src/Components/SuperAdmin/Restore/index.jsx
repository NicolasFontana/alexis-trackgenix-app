import { ConfirmModal, ErrorSuccessModal, Preloader, Table } from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDeletedAdmins, restoreAdmin } from 'redux/admins/thunks';
import styles from './restore.module.css';

const Admins = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);
  const [showModalFormRestore, setShowModalFormRestore] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [idRestore, setIdRestore] = useState();

  let modalRestore;
  let modalErrorSuccess;

  useEffect(() => {
    dispatch(getDeletedAdmins());
  }, [!showModalFormRestore]);

  const handleConfirm = () => {
    dispatch(restoreAdmin(idRestore, setResponse)).then(() => {
      setShowModalFormRestore(false);
      setShowSuccessModal(true);
    });
  };

  const openConfirmModal = (id) => {
    setIdRestore(id);
    setShowModalFormRestore(true);
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
        confirmDelete={handleConfirm}
        title="Restore Admin"
        message="Are you sure you want to restore this admin?"
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
      {modalErrorSuccess}
      {isLoading ? <Preloader /> : null}
      <h2 className={styles.title}>Deleted Admins</h2>
      <Table
        data={admins}
        headers={['firstName', 'lastName', 'email']}
        titles={['First Name', 'Last Name', 'Email']}
        editAction={openConfirmModal}
        sort={{ firstName: 1, lastName: 1, email: 1 }}
      />
    </section>
  );
};

export default Admins;
