import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './listItem.module.css';
import Button from '../../Shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

const ListItem = ({ listItem, deleteSuperA }) => {
  const handleDelete = () => {
    deleteSuperA(listItem._id);
  };

  const trash = <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>;
  const pencil = <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>;

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
        <Button
          clickAction={routeChange}
          buttonText={pencil}
          className={styles.buttonEdit}
        ></Button>
      </td>
      <td className={styles.td}>
        <Button
          clickAction={() => handleDelete(listItem._id)}
          buttonText={trash}
          className={styles.buttonDelete}
        ></Button>
      </td>
    </tr>
  );
};

export default ListItem;
