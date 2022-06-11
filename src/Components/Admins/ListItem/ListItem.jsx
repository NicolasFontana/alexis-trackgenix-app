import React from 'react';
import styles from './listItem.module.css';

const ListItem = ({ listItem, deleteAction }) => {
  const url = `/admins/Edit?id=${listItem._id}`;

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{listItem._id}</td>
      <td className={styles.td}>{listItem.firstName}</td>
      <td className={styles.td}>{listItem.lastName}</td>
      <td className={styles.td}>{listItem.email}</td>
      <td className={styles.td}>{listItem.password}</td>
      <td className={styles.td}>{listItem.active.toString()}</td>
      <td className={styles.td}>
        <a href={url}>
          <button>&#9998;</button>
        </a>
      </td>
      <td className={styles.td}>
        <button onClick={() => deleteAction(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
