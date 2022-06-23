import React from 'react';
import styles from './list.module.css';
import ListItem from '../ListItem/ListItem';

const List = ({ admins, deleteAction }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tr}>
            <th id="id" className={styles.th}>
              ID
            </th>
            <th id="first-name" className={styles.th}>
              First Name
            </th>
            <th id="last-name" className={styles.th}>
              Last Name
            </th>
            <th id="email" className={styles.th}>
              Email
            </th>
            <th id="password" className={styles.th}>
              Password
            </th>
            <th id="active" className={styles.th}>
              Active
            </th>
            <th className={styles.th}>Edit</th>
            <th className={styles.th}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((item) => (
            <ListItem key={item._id} listItem={item} deleteAction={deleteAction} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
