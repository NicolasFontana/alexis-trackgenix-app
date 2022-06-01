import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import List from './List/List';

const Employees = () => {
  const [list, setEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
        console.log(response);
      });
  }, []);

  const deleteItem = async (_id) => {
    setEmployees([...list.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.employees}> Employees </h2>
      <List list={list} setEmployees={setEmployees} deleteItem={deleteItem} />
      <button className={styles.addbtn}>&#10010;</button>
    </section>
  );
};

export default Employees;
