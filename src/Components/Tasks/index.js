import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Table from '../Shared/Table/Table';
import Preloader from '../Shared/Preloader/Preloader';
import AddButton from '../Shared/Buttons/ButtonAdd';
import Form from './Form/Form';
import Modal from '../Shared/ModalForm/index';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idDelete, setIdDelete] = useState(0);
  let modal;
  let confirmModal;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/tasks`)
      .then((response) => response.json())
      .then((response) => {
        saveTasks(response.data);
        setLoading(false);
      });
  }, []);

  const delTask = () => {
    saveTasks([...tasks.filter((task) => task._id !== idDelete)]);
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${idDelete}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        alert('Task deleted successfully', response.msg); // aca se llamaria al succes modal
        closeModal();
      });
  };

  const addTask = () => {
    setShowModal(true);
    modal = (
      <Modal isOpen={showModal} handleClose={closeModal} title="Add Tasks">
        <Form />
      </Modal>
    );
  };

  const openConfirmModal = (id) => {
    setShowConfirmModal(true);
    setIdDelete(id);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowConfirmModal(false);
  };

  if (showConfirmModal) {
    confirmModal = (
      <ConfirmModal
        isOpen={showConfirmModal}
        handleClose={closeModal}
        confirmDelete={delTask}
        title="Delete Task"
        message="¿Are you sure you want to delete the task?"
      ></ConfirmModal>
    );
  }

  return loading ? (
    <Preloader>
      <p>Loading Tasks</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2>TASKS</h2>
      {modal}
      {confirmModal}
      <Table
        data={tasks}
        headers={['taskName', 'startDate', 'workedHours', 'description', 'status']}
        titles={['Task Name', 'Start Date', 'Worked Hours', 'Description', 'Status']}
        delAction={openConfirmModal}
        editAction="todavia no hay"
      />
      <AddButton clickAction={addTask}></AddButton>
    </section>
  );
}

export default Tasks;
