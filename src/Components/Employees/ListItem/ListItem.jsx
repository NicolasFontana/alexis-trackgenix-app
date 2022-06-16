import styles from './list-item.module.css';
import { useEffect, useState } from 'react';
import React from 'react';
import ModalForm from '../../Shared/ModalForm';
import Form from '../Form';

const ListItem = ({ listItem, deleteItem, setShowModal, setTitleModal }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [listItemState, setlistItemState] = useState(listItem);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employees/${listItem._id}`)
      .then((response) => response.json())
      .then((response) => {
        setlistItemState(response.data);
      });
  }, [showEditModal]);

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this employee?`)) {
      deleteItem(listItem._id);
      setShowModal(true);
      setTitleModal('Employee deleted');
    }
  };

  return (
    <tr className={styles.rows}>
      <td>{listItemState._id}</td>
      <td>{listItemState.firstName}</td>
      <td>{listItemState.lastName}</td>
      <td>{listItemState.phone}</td>
      <td>{listItemState.email}</td>
      <td>{listItemState.active.toString()}</td>
      <td>{listItemState.isProjectManager.toString()}</td>
      <td>{listItemState.projects.length}</td>
      <td>{listItemState.timeSheets.length}</td>
      <td>
        <ModalForm show={showEditModal} closeModalForm={closeEditModal}>
          <Form employeeId={listItem._id} edit={true} closeModalForm={closeEditModal} />
        </ModalForm>
        <button
          onClick={() => {
            setShowEditModal(true);
          }}
          className={styles.editbtn}
        >
          &#9998;
        </button>
        <button
          className={styles.deletebtn}
          onClick={() => {
            handleDelete(listItem._id);
          }}
        >
          &#10006;
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
