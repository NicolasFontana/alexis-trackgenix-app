import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './listItem.module.css';
import ButtonEdit from '../../Shared/Buttons/ButtonEdit';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';

const ListItem = ({ listItem, deleteSuperA }) => {
  const handleDelete = () => {
    deleteSuperA(listItem._id);
  };

  const history = useHistory();

  const routeChange = () => {
    let path = `/super-admins/edit?id=${listItem._id}`;
    history.push(path);
  };

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{listItem._id}</td>
      <td className={styles.td}>{listItem.firstName}</td>
      <td className={styles.td}>{listItem.lastName}</td>
      <td className={styles.td}>{listItem.email}</td>
      <td className={styles.td}>{listItem.password}</td>
      <td className={styles.td}>{listItem.active.toString()}</td>
      <td className={styles.td}>
        <ButtonEdit clickAction={routeChange}></ButtonEdit>
      </td>
      <td className={styles.td}>
        <ButtonDelete clickAction={() => handleDelete(listItem._id)}></ButtonDelete>
      </td>
    </tr>
  );
};

export default ListItem;
