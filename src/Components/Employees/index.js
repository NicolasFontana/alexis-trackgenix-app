import { useEffect, useState } from 'react';
import FormModal from './FormModal';
import List from './List/List';
import styles from './employees.module.css';

const Employees = () => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [list, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/employees/`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });
  }, []);

  const closeFormModal = () => {
    setShowFormModal(false);
  };

  const deleteItem = async (_id) => {
    setEmployees([...list.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <List list={list} setEmployees={setEmployees} deleteItem={deleteItem} />
      <FormModal show={showFormModal} closeModal={closeFormModal} />
      <img
        onClick={() => {
          setShowFormModal(true);
        }}
        src={`${process.env.PUBLIC_URL}/assets/images/add-icon.svg`}
      />
    </section>
  );
};

export default Employees;
