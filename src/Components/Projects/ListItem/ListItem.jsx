import React from 'react';
import styles from './list-item.module.css';

const ListItem = ({ listItem, deleteItem, setShowModal, setTitleModal }) => {
  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete this project?`)) {
      deleteItem(listItem._id);
      setShowModal(true);
      setTitleModal('Project deleted');
    }
  };
  return (
    <tr className={styles.rows}>
      <td>{listItem._id}</td>
      <td>{listItem.name}</td>
      <td>{listItem.description}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.endDate}</td>
      <td>{listItem.clientName}</td>
      <td>{listItem.active.toString()}</td>
      <td>{listItem.members.length}</td>
      <td>
        <a href={`/projects/form?id=${listItem._id}`}>
          <button className={styles.editbtn}>&#9998;</button>
        </a>
        <button className={styles.deletebtn} onClick={() => handleDelete(listItem._id)}>
          &#10006;
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
