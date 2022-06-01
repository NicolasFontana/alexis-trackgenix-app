import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import List from './List/List';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteSuperA = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/super-admins/${_id}`, {
        method: 'DELETE'
      });
      console.log('response', response);
      confirm(`WARNING!\n Are you sure you want to delete this super admin?`);
    } catch (error) {
      console.error(error);
    }
    setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <div>
      <Modal show={showModal} close={closeModal} />
      <List superAdmins={superAdmins} setSuperAdmins={setSuperAdmins} deleteSuperA={deleteSuperA} />
    </div>
  );
};

export default App;
