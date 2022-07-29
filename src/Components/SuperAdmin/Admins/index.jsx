import {
  ButtonText,
  ConfirmModal,
  ErrorSuccessModal,
  ModalForm,
  Preloader,
  Table,
  ScrollToTop
} from 'Components/Shared';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delAdmin, getAdmins } from 'redux/admins/thunks';
import styles from './admins.module.css';
import Form from './Add';
import EditForm from './Edit';

const Admins = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);

  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showModalFormDelete, setShowModalFormDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [idDelete, setIdDelete] = useState();

  let modalEdit;
  let modalAdd;
  let modalDelete;
  let modalErrorSuccess;

  useEffect(() => {
    dispatch(getAdmins());
  }, [!showModalFormAdd, !showModalFormEdit, !showModalFormDelete]);

  const handleConfirm = () => {
    dispatch(delAdmin(idDelete, (response) => setResponse(response))).then(() => {
      setShowModalFormDelete(false);
      setShowSuccessModal(true);
    });
  };

  const openConfirmModal = (id) => {
    setIdDelete(id);
    setShowModalFormDelete(true);
  };

  const openAddModal = () => {
    setShowModalFormAdd(true);
  };

  const openEditModal = (id) => {
    setIdDelete(id);
    setShowModalFormEdit(true);
  };

  const closeModalFormAdd = () => {
    setShowModalFormAdd(false);
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  const closeErrorSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Admin">
        <EditForm
          edit={admins.find((item) => item._id === idDelete)}
          closeModalForm={closeModalFormEdit}
        />
      </ModalForm>
    );
  }

  if (showModalFormAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalFormAdd} handleClose={closeModalFormAdd} title="Add Admin">
        <Form closeModalForm={closeModalFormAdd} />
      </ModalForm>
    );
  }

  if (showModalFormDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalFormDelete}
        handleClose={() => {
          setShowModalFormDelete(false);
        }}
        confirmDelete={handleConfirm}
        title="Delete Admin"
        message="Are you sure you want to delete this admin?"
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

  return isLoading &&
    !showModalFormEdit &&
    !showModalFormAdd &&
    !showModalFormDelete &&
    !showSuccessModal ? (
    <Preloader>
      <p>Loading Admins</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      {modalEdit}
      {modalAdd}
      {modalDelete}
      {modalErrorSuccess}
      {isLoading ? <Preloader /> : null}
      <h2 className={styles.title}>Admins</h2>
      <div className={styles.divContainer}>
        <ButtonText label="ADD ADMIN" clickAction={openAddModal}></ButtonText>
      </div>
      <Table
        data={admins}
        headers={['firstName', 'lastName', 'email']}
        titles={['First Name', 'Last Name', 'Email']}
        editAction={openEditModal}
        delAction={openConfirmModal}
        sort={{ firstName: 1, lastName: 1, email: 1 }}
      />
      <ScrollToTop />
    </section>
  );
};

export default Admins;
