import React, { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
// import List from './List/List';
import Preloader from '../Shared/Preloader/Preloader';
import styles from './super-admins.module.css';
import ButtonAdd from '../Shared/Buttons/ButtonAdd';
import Table from '../Shared/Table/Table';
import FormAdd from './Form/Add';
import ModalForm from '../Shared/ModalForm';
import { useDispatch, useSelector } from 'react-redux';
import { getSuperAdmins, deleteSuperAdmins } from '../../redux/super-admins/thunks';

const App = () => {
  const dispatch = useDispatch();
  const superAdmins = useSelector((state) => state.superAdmins.list);
  const isLoading = useSelector((state) => state.superAdmins.isLoading);
  // const [superAdmins, setSuperAdmins] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  // const [showModalFormEdit, setShowModalFormEdit] = useState(false);

  const addOpen = () => {
    setShowModalFormAdd(true);
  };

  const addClose = () => {
    setShowModalFormAdd(false);
  };

  // const editOpen = () => {
  //   setShowModalFormEdit(true);
  // };

  // const editClose = () => {
  //   setShowModalFormAdd(false);
  // };

  const deleteSuperA = (_id) => {
    dispatch(deleteSuperAdmins(_id));
  };

  useEffect(() => {
    dispatch(getSuperAdmins());
    // fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setSuperAdmins(response.data);
    //     setLoading(false);
    //   });
  }, []);

  // const deleteSuperA = async (_id) => {
  //   if (confirm(`WARNING!\n Are you sure you want to delete this super admin?`)) {
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${_id}`, {
  //         method: 'DELETE'
  //       });
  //       const data = await response.json();
  //       alert(`${data.message}\nID: ${_id}`);
  //       setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== _id)]);
  //     } catch (error) {
  //       alert(`Error\n${error}`);
  //       console.error(error);
  //     }
  //   }
  // };

  const editSuperA = () => {
    console.log('Edit');
  };

  let modalAdd;
  if (showModalFormAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalFormAdd} handleClose={addClose} title="Add Super Admin">
        <FormAdd closeModalForm={addClose} />
      </ModalForm>
    );
  }

  return isLoading ? (
    <Preloader>
      <p>Loading super admins</p>
    </Preloader>
  ) : (
    <div className={styles.container}>
      <Table
        data={superAdmins}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        titles={['ID', 'First Name', 'Last Name', 'Email', 'Password', 'Active']}
        delAction={deleteSuperA}
        editAction={editSuperA}
      />
      {modalAdd}
      <ButtonAdd clickAction={addOpen}></ButtonAdd>
    </div>
  );
};

export default App;
