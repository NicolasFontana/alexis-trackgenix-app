import React from 'react';
import styles from './listItem.module.css';

const ListItem = (props) => {
  const { admins, delAdmin } = props;

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{admins.firstName}</td>
      <td className={styles.td}>{admins.lastName}</td>
      <td className={styles.td}>{admins.email}</td>
      <td className={styles.td}>{admins.password}</td>
      <td className={styles.td}>{admins.active.toString()}</td>
      <td className={styles.td}>
        <a className={styles.button} href={`/admins/edit?id=${admins._id}`}>
          <button>&#9998;</button>
        </a>
      </td>
      <td className={styles.td}>
        <button className={styles.button} onClick={() => delAdmin(props.admins._id)}>
          X
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
