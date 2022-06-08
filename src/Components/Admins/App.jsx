import React, { useState, useEffect } from 'react';
import List from './List/List';
import Preloader from '../Shared/Preloader/Preloader';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';

const App = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [idDelete, setIdDelete] = useState(false);

  const closeConfirmModal = () => {
    setShowModal(false);
  };

  const openConfirmModal = (id) => {
    setShowModal(true);
    setIdDelete(id);
    console.log('entro al confirm modal');
    console.log(id);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      setAdmins(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmins = async (idDelete) => {
    console.log('entro al delete');
    console.log(idDelete);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${idDelete}`, {
        method: 'DELETE'
      });
      setAdmins([...admins.filter((listItem) => listItem._id !== idDelete)]);
    } catch (error) {
      alert(`Error\n${error}`);
      console.error(error);
    }
    setShowModal(false);
  };

  return loading ? (
    <Preloader>
      <p>Loading admins</p>
    </Preloader>
  ) : (
    <div className="App">
      <List admins={admins} setAdmins={setAdmins} deleteAction={openConfirmModal} />
      <ConfirmModal
        isOpen={showModal}
        handleClose={closeConfirmModal}
        confirmDelete={deleteAdmins}
        idDelete={idDelete}
      >
        <h2>Confirm delete admin ?</h2>
      </ConfirmModal>
    </div>
  );
};

export default App;
