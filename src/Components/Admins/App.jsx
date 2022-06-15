import React, { useState, useEffect } from 'react';
import Preloader from '../Shared/Preloader/Preloader';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import Table from '../Shared/Table/Table';
import styles from '../Admins/admins.module.css';
import ButtonAdd from '../Shared/Buttons/ButtonAdd';
import EditForm from './Edit/index';
import Modal from '../Shared/ModalForm/index';
import Form from './Add/index';
import MessageModal from '../Shared/ErrorSuccessModal';
import { useDispatch, useSelector } from 'react-redux';
import { delAdmin, getAdmins } from '../../redux/admins/thunks';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [idDelete, setIdDelete] = useState(0);
  const [idToEdit, setIdToEdit] = useState();
  let modalEdit;
  let modalAdd;
  let modalMessage;
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);

  const handleConfirm = () => {
    dispatch(delAdmin(idDelete, (alertMessage) => setMessage(alertMessage)));
    console.log(message);
    closeConfirmModal();
    setShowMessageModal(true);
  };

  const openConfirmModal = (id) => {
    setShowModalConfirm(true);
    setIdDelete(id);
  };

  const openAddModal = () => {
    setShowModalFormAdd(true);
  };

  const openEditModal = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  const closeConfirmModal = () => {
    setShowModalConfirm(false);
    setShowModalFormEdit(false);
    setShowModalFormAdd(false);
    setShowMessageModal(false);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <Modal isOpen={showModalFormEdit} handleClose={closeConfirmModal} title="Edit Admin">
        <EditForm closeModalForm={closeConfirmModal} adminId={idToEdit} />
      </Modal>
    );
  }

  if (showModalFormAdd) {
    modalAdd = (
      <Modal isOpen={showModalFormAdd} handleClose={closeConfirmModal} title="Add Admin">
        <Form closeModalForm={closeConfirmModal} />
      </Modal>
    );
  }

  let modalConfirm;

  if (showModalConfirm) {
    modalConfirm = (
      <ConfirmModal
        isOpen={showModalConfirm}
        handleClose={closeConfirmModal}
        confirmDelete={handleConfirm}
        title="Delete Employee"
        message="Are you sure you want to delete this employee?"
      />
    );
  }

  return isLoading ? (
    <Preloader>
      <p>Loading admins</p>
    </Preloader>
  ) : (
    <div className={styles.container}>
      {modalConfirm}
      {modalEdit}
      {modalAdd}
      {modalMessage}
      <Table
        data={admins}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        titles={['ID', 'Name', 'lastName', 'Email', 'Password', 'Active']}
        delAction={openConfirmModal}
        editAction={openEditModal}
      />
      <MessageModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeConfirmModal}
        successResponse={message}
      />
      <ButtonAdd clickAction={openAddModal}></ButtonAdd>
    </div>
  );
};

export default App;
