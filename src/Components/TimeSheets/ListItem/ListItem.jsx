import React from 'react';
import styles from './ListItem.module.css';

const ListItem = ({ listTimeSheet, deleteItem, setShowModal }) => {
  const handleDelete = () => {
    if (confirm(`WARNING!\n Are you sure you want to delete this timesheet?`)) {
      deleteItem(listTimeSheet._id);
      setShowModal(true);
    }
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
        <a href={`/time-sheets/form?id=${listTimeSheet._id}`}>
          <button>&#9998;</button>
        </a>
      </td>
      <td>
        <button
          className={styles.delete}
          onClick={() => {
            handleDelete();
          }}
        >
          &#10006;
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
