import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmins, delAdmin } from '../../redux/admins/thunks';
import styles from '../Admins/admins.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ModalForm from '../Shared/ModalForm';
import Form from './Add/index';
import EditForm from './Edit/index';
import ButtonAdd from '../Shared/Buttons/ButtonAdd';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import SuccessModal from '../Shared/ErrorSuccessModal';

const App = () => {
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);
  const [showModalFormAdd, setShowModalFormAdd] = useState(false);
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showModalFormDelete, setShowModalFormDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [idDelete, setIdDelete] = useState();

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const closeModalFormAdd = () => {
    setShowModalFormAdd(false);
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  let modalEdit;
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

  let modalAdd;
  if (showModalFormAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalFormAdd} handleClose={closeModalFormAdd} title="Add Admin">
        <Form closeModalForm={closeModalFormAdd} />
      </ModalForm>
    );
  }

  let modalDelete;
  if (showModalFormDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalFormDelete}
        handleClose={() => {
          setShowModalFormDelete(false);
        }}
        confirmDelete={() => {
          dispatch(delAdmin(idDelete, setResponse));
          setShowModalFormDelete(false);
          setShowSuccessModal(true);
        }}
        title="Delete Admin"
        message="Are you sure you want to delete this admin?"
      />
    );
  }

  return isLoading &&
    !showModalFormEdit &&
    !showModalFormAdd &&
    !showModalFormDelete &&
    !showSuccessModal ? (
    <Preloader>
      <p>Loading admins</p>
    </Preloader>
  ) : (
    <div className={styles.container}>
      <Table
        data={admins}
        headers={['_id', 'firstName', 'lastName', 'email', 'password', 'active']}
        titles={['ID', 'Name', 'LastName', 'Email', 'Password', 'Active']}
        delAction={(id) => {
          setIdDelete(id);
          setShowModalFormDelete(true);
        }}
        editAction={(id) => {
          setIdDelete(id);
          setShowModalFormEdit(true);
        }}
      />
      {modalEdit}
      {modalAdd}
      {modalDelete}
      {isLoading ? <Preloader /> : null}
      <ButtonAdd
        clickAction={() => {
          setShowModalFormAdd(true);
        }}
      />
      <SuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={() => {
          setShowSuccessModal(false);
        }}
        successResponse={response}
      />
    </div>
  );
};

export default App;
