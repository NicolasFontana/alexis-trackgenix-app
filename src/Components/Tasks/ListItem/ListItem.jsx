import React from 'react';
import styles from './listItem.module.css';

const ListItem = (props) => {
  const { task, delItem, setShowModal } = props;

  const handleDel = () => {
    delItem(task._id);
    setShowModal(true);
  };

  return (
    <tr className={styles.rows}>
      <td className={styles.items}>{task.taskName}</td>
      <td className={styles.items}>{task.startDate}</td>
      <td className={styles.items}>{task.workedHours}</td>
      <td className={styles.items}>{task.description}</td>
      <td className={styles.items}>{task.status}</td>
      <td className={styles.buttonContainer}>
        <button className={styles.button}>Edit</button>
      </td>
      <td className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => handleDel(task._id)}>
          X
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
