import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmin } from 'redux/super-admins/thunks';
import {
  Preloader,
  ButtonAdd,
  Table,
  ModalForm,
  ConfirmModal,
  ErrorSuccessModal
} from 'Components/Shared';
import FormAdd from './Form/Add';
import FormEdit from './Form/Edit';
import styles from './super-admins.module.css';

const App = () => {
  const dispatch = useDispatch();
  const superAdmins = useSelector((state) => state.superAdmins.list);
  const isLoading = useSelector((state) => state.superAdmins.isLoading);

  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormDelete, setShowModalFormDelete] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [superAdminId, setSuperAdminId] = useState();

  let modalDelete;
  let modalAdd;
  let modalEdit;

  useEffect(() => {
    dispatch(getSuperAdmins());
  }, []);

  const handleConfirm = () => {
    dispatch(deleteSuperAdmin(superAdminId, (response) => setMessage(response))).then(() => {
      setShowModalFormDelete(false);
      setShowMessageModal(true);
    });
  };

  const addOpen = () => {
    setShowModalFormAdd(true);
  };

  const addClose = () => {
    setShowModalFormAdd(false);
  };

  const editOpen = (id) => {
    setSuperAdminId(id);
    setShowModalFormEdit(true);
  };

  const editClose = () => {
    setShowModalFormEdit(false);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  if (showModalFormAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalFormAdd} handleClose={addClose} title="Add Super Admin">
        <FormAdd closeModalForm={addClose} />
      </ModalForm>
    );
  }

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={editClose} title="Edit Super Admin">
        <FormEdit
          superAdminEdit={superAdmins.find((item) => item._id === superAdminId)}
          closeModalForm={editClose}
        />
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
        title="Delete Super Admin"
        message="Are you sure you want to delete this Super Admin?"
      />
    );
  }

  return isLoading &&
    !showModalFormEdit &&
    !showModalFormAdd &&
    !showModalFormDelete &&
    !showMessageModal ? (
    <Preloader>
      <p>Loading Super Admins</p>
    </Preloader>
  ) : (
    <div className={styles.containerApp}>
      <h2 className={styles.title}>Super Admins</h2>
      {modalAdd}
      {modalEdit}
      {modalDelete}
      {isLoading ? <Preloader /> : null}
      <Table
        data={superAdmins}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        titles={['ID', 'First Name', 'Last Name', 'Email', 'Password', 'Active']}
        delAction={(id) => {
          setSuperAdminId(id);
          setShowModalFormDelete(true);
        }}
        editAction={editOpen}
      />
      {isLoading ? <Preloader /> : null}
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeMessageModal}
        successResponse={message}
      />
      <ButtonAdd clickAction={addOpen}></ButtonAdd>
    </div>
  );
};

export default App;
