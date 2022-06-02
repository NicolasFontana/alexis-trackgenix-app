import React from 'react';
import styles from './list-item.module.css';

const ListItem = ({ listItem, deleteItem, setShowModal, setTitleModal }) => {
  const handleDelete = async (_id) => {
    deleteItem(_id);
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/employees/${_id}`, {
        method: 'DELETE'
      });
      setShowModal(true);
      setTitleModal('Employee deleted');
    } catch (error) {
      setShowModal(true);
      setTitleModal('Error. Employee could not be deleted');
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
        <button className={styles.deletebtn} onClick={() => handleDelete(listItem._id)}>
          &#10006;
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
