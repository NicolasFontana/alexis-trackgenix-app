import React from 'react';
import styles from './list-item.module.css';

const ListItem = ({ listItem, deleteItem, setShowModal, setTitleModal }) => {
  const handleDelete = async (_id) => {
    deleteItem(_id);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}api/projects/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Project deleted');
    } catch (error) {
      setShowModal(true);
      setTitleModal('Error. Project could not be deleted');
      console.error(error);
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
