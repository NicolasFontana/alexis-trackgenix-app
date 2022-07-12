import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { Select } from 'Components/Shared';
import styles from 'Components/Admin/Employees/EmployeePage/employeePage.module.css';

const EmployeePage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const projects = useSelector((state) => state.projects.list);
  let employee;

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, []);

  if (employees && projects) {
    const { id } = useParams();
    const employeeProjects = projects.filter((project) => {
      project.members.find((member) => member._id === id);
    });
    employee = employees.find((element) => element._id === id);
    console.log(employee);
    console.log(employeeProjects);
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employee Page</h2>
      <div className={styles.box}>
        <div className={styles.field}>
          <h3>First Name</h3>
          <p>{employee.firstName}</p>
        </div>
        <div className={styles.field}>
          <h3>Last Name</h3>
          <p>{employee.lastName}</p>
        </div>
        <div className={styles.field}>
          <h3>DNI</h3>
          <p>{employee.dni ? employee.dni : 'was not loaded'}</p>
        </div>
        <div className={styles.field}>
          <h3>Date of Birth</h3>
          <p>{employee.dateBirth ? employee.dateBirth : 'was not loaded'}</p>
        </div>
        <div className={styles.field}>
          <h3>Adress</h3>
          <p>{employee.address ? employee.address : 'was not loaded'}</p>
        </div>
        <div className={styles.field}>
          <h3>Phone</h3>
          <p>{employee.phone ? employee.phone : 'was not loaded'}</p>
        </div>
        <div className={styles.field}>
          <h3>Email</h3>
          <p>{employee.email ? employee.email : 'was not loaded'}</p>
        </div>
        <div className={styles.field}>
          <h3>Status</h3>
          <p>{employee.status ? employee.status : 'was not loaded'}</p>
        </div>
        <div className={styles.field}>
          <h3>Rate</h3>
          <p>a</p>
        </div>
        <div className={styles.field}>
          <h3>Role</h3>
          <p>a</p>
        </div>
        <div className={styles.select}>
          <Select
            title="Projects"
            defaultValue=""
            data={projects}
            disabled
            register={console.log}
          />
        </div>
      </div>
    </section>
  );
};

export default EmployeePage;
