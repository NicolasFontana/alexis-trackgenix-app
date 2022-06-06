import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List/List';
import ModalForm from '../Shared/ModalForm';
import Form from './Form';

const Employees = () => {
  const [list, setEmployees] = useState([]);
  const [showModalForm, setShowModalForm] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, [showModalForm]);

  const closeModalForm = () => {
    setShowModalForm(false);
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
      <ModalForm show={showModalForm} closeModalForm={closeModalForm}>
        <Form closeModalForm={closeModalForm} />
      </ModalForm>
      <button
        className={styles.addbtn}
        onClick={() => {
          setShowModalForm(true);
        }}
      >
        &#10010;
      </button>
    </section>
  );
};

export default Employees;
