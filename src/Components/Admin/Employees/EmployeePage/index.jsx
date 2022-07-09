import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import { useParams } from 'react-router-dom';
import styles from 'Components/Employee/Home/home.module.css';

const EmployeePage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  let employee;

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  if (employees) {
    const { id } = useParams();
    employee = employees.find((element) => element._id === id);
    console.log(employee);
  }

  return (
    <section className={styles.container}>
      <h2>Employee Page</h2>
    </section>
  );
};

export default EmployeePage;
