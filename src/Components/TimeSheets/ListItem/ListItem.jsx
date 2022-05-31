import React from 'react';
import styles from './ListItem.module.css';

const ListItem = ({ listTimeSheet, deleteItem }) => {
  console.log(listTimeSheet);
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
        <button>&#9998;</button>
      </td>
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
    </tr>
  );
};

export default ListItem;
