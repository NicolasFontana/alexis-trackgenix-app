import { useEffect, useState } from 'react';
import FormModal from '../FormModal';
import styles from './list-item.module.css';

const ListItem = ({ listItem, deleteItem, setShowModal, setTitleModal }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [listItemState, setlistItemState] = useState(listItem);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employees/${listItem._id}`)
      .then((response) => response.json())
      .then((response) => {
        setlistItemState(response.data);
      });
  }, [showEditModal]);

  const closeEditModal = () => {
    setShowEditModal(false);
  };

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
      console.error(error);
    }
  };

  return (
    <tr className={styles.rows}>
      <td>{listItemState._id}</td>
      <td>{listItemState.firstName}</td>
      <td>{listItemState.lastName}</td>
      <td>{listItemState.phone}</td>
      <td>{listItemState.email}</td>
      <td>{listItemState.active.toString()}</td>
      <td>{listItemState.isProjectManager.toString()}</td>
      <td>{listItemState.projects.length}</td>
      <td>
        <FormModal
          show={showEditModal}
          closeModal={closeEditModal}
          listItemId={listItemState._id}
          edit={true}
        />
        <button
          onClick={() => {
            setShowEditModal(true);
          }}
          className={styles.editbtn}
        >
          &#9998;
        </button>
        <button className={styles.deletebtn} onClick={() => handleDelete(listItemState._id)}>
          &#10006;
        </button>
      </td>
    </tr>
  );
};

export default ListItem;
