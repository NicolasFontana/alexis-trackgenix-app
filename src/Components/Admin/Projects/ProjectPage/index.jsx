import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getProjectById } from 'redux/projects/thunks';
import { useParams } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import styles from './projectPage.module.css';

const ProjectPage = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.list);
  const employees = useSelector((state) => state.employees.list);
  const { id } = useParams();
  let employee;

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, []);

  if (employees && projects) {
    const employeeProjects = projects.filter((project) => {
      project.members.find((member) => member._id === id);
    });
    employee = employees.find((element) => element._id === id);
    console.log(employee);
    console.log(employeeProjects);
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Project Page</h2>
      <div className={styles.box}>
        <div className={styles.field}>
          <h3>Project Name</h3>
          <p>a</p>
        </div>
        <div className={styles.field}>
          <h3>Client</h3>
          <p>a</p>
        </div>
        <div className={styles.field}>
          <h3>PM</h3>
          <p>a</p>
        </div>
        <div className={styles.field}>
          <h3>Description</h3>
          <p>a</p>
        </div>
        <div className={styles.field}>
          <h3>Start Date</h3>
          <p>a</p>
        </div>
        <div className={styles.field}>
          <h3>Active</h3>
          <p>a</p>
        </div>
      </div>
    </section>
  );
};

export default ProjectPage;
