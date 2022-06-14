import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Preloader from '../Shared/Preloader/Preloader';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import Table from '../Shared/Table/Table';
import styles from '../Admins/admins.module.css';
import ButtonAdd from '../Shared/Buttons/ButtonAdd';
import EditForm from './Edit/index';
import Modal from '../Shared/ModalForm/index';

const App = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  const [idToEdit, setIdToEdit] = useState();
  let modalEdit;

  const history = useHistory();

  const routeChange = () => {
    let path = `/admins/Add`;
    history.push(path);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response.data);
        setLoading(false);
      });
  }, []);

  const closeConfirmModal = () => {
    setShowModalConfirm(false);
    setShowModalFormEdit(false);
  };

  const openConfirmModal = (id) => {
    setShowModalConfirm(true);
    setIdDelete(id);
  };

  const openEditModal = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <Modal isOpen={showModalFormEdit} handleClose={closeConfirmModal} title="Edit Admin">
        <EditForm closeModalForm={closeConfirmModal} adminId={idToEdit} />
      </Modal>
    );
  }

  const confirmDeleteAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/admins/${idDelete}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          setAdmins([...admins.filter((listItem) => listItem._id !== idDelete)]);
        }
      });
    setShowModalConfirm(false);
  };

  let modalConfirm;

  if (showModalConfirm) {
    modalConfirm = (
      <ConfirmModal
        isOpen={showModalConfirm}
        handleClose={closeConfirmModal}
        confirmDelete={confirmDeleteAdmin}
        title="Delete Admin"
        message="Are you sure to delete the admin ?"
      ></ConfirmModal>
    );
  }

  return loading ? (
    <Preloader>
      <p>Loading admins</p>
    </Preloader>
  ) : (
    <div className={styles.container}>
      {modalConfirm}
      {modalEdit}
      <Table
        data={admins}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        titles={['ID', 'Name', 'lastName', 'Email', 'Password', 'Active']}
        delAction={openConfirmModal}
        editAction={openEditModal}
      />
      <ButtonAdd clickAction={routeChange}></ButtonAdd>
    </div>
  );
};

export default App;
