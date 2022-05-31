import React, { useState } from 'react';
import styles from './ListItem.module.css';
import EditItem from '../EditItem/EditItem';

const ListItem = ({ listTimeSheet, deleteItem, setShowModal, setShowTitle }) => {
  const [showFormEdit, setShowFormEdit] = useState(false);
  console.log(listTimeSheet);
  const closeForm = () => {
    setShowFormEdit(false);
  };
  const openForm = () => {
    setShowFormEdit(true);
  };
  return (
    <tr>
      <td>{listTimeSheet.projectId.name}</td>
      <td>{listTimeSheet.Task[0].taskId._id}</td>
      <td>{listTimeSheet.Task[0].taskId.taskName}</td>
      <td>{listTimeSheet.Task[0].taskId.startDate}</td>
      <td>{listTimeSheet.Task[0].taskId.workedHours}</td>
      <td>{listTimeSheet.Task[0].taskId.description}</td>
      <td>{listTimeSheet.Task[0].taskId.status}</td>
      <td>{listTimeSheet.approved ? 'Approved' : 'Not approved'}</td>
      <td>
        <button
          className={styles.delete}
          onClick={() => {
            deleteItem(listTimeSheet._id);
          }}
        >
          &#10006;
        </button>
      </td>
      <td>
        <EditItem
          key={listTimeSheet._id}
          show={showFormEdit}
          closeForm={closeForm}
          previewTimeSheet={listTimeSheet}
          setShowModal={setShowModal}
          setShowTitle={setShowTitle}
        />
        <a>
          <button onClick={openForm}>&#9998;</button>
        </a>
      </td>
    </tr>
  );
};

export default ListItem;
