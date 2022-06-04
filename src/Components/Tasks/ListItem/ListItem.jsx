import React from 'react';
import styles from './listItem.module.css';

const ListItem = (props) => {
  const { task, delTask } = props;

  return (
    <tr className={styles.rows}>
      <td className={styles.items}>{task.taskName}</td>
      <td className={styles.items}>{task.startDate}</td>
      <td className={styles.items}>{task.workedHours}</td>
      <td className={styles.items}>{task.description}</td>
      <td className={styles.items}>{task.status}</td>
      <td className={styles.buttonContainer}>
        <a className={styles.button} href={`/tasks/edit?id=${task._id}`}>
          Edit
        </a>
      </td>
      <td className={styles.buttonContainer}>
        <button className={styles.button} onClick={() => delTask(props.task._id)}>
          X
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
