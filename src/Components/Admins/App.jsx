import React, { useState, useEffect } from 'react';
import List from './List/List';
import Preloader from '../Shared/Preloader/Preloader';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';

const App = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState(0);

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
  };

  const openConfirmModal = (id) => {
    setShowModalConfirm(true);
    setIdDelete(id);
  };

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
    <div className="App">
      <List admins={admins} setAdmins={setAdmins} deleteAction={openConfirmModal} />
      {modalConfirm}
    </div>
  );
};

export default App;
