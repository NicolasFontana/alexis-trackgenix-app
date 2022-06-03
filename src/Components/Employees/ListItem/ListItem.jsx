import React from 'react';
import styles from './list-item.module.css';

const ListItem = ({ listItem, deleteItem, setShowModal, setTitleModal }) => {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this employee?`)) {
      deleteItem(listItem._id);
      setShowModal(true);
      setTitleModal('Employee deleted');
    }
  };
  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.phone}</td>
      <td>{listItem.email}</td>
      <td>{listItem.active.toString()}</td>
      <td>{listItem.isProjectManager.toString()}</td>
      <td>{listItem.projects.length}</td>
      <td>{listItem.timeSheets.length}</td>
      <td>
        <button className={styles.editbtn}>&#9998;</button>
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
