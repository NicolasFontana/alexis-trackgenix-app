import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List/List';
import FormModal from './FormModal';

const Employees = () => {
  const [list, setEmployees] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, [showFormModal]);

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const deleteItem = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/employees/${_id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
    setEmployees([...list.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.employees}> Employees </h2>
      <List list={list} setEmployees={setEmployees} deleteItem={deleteItem} />
      <FormModal show={showFormModal} closeModal={closeFormModal} />
      <button
        className={styles.addbtn}
        onClick={() => {
          setShowFormModal(true);
        }}
      >
        &#10010;
      </button>
    </section>
  );
};

export default Employees;
