import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getProjectById } from 'redux/projects/thunks';
import { useParams } from 'react-router-dom';
// import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import styles from './projectPage.module.css';
import { Preloader, Table } from 'Components/Shared';

const ProjectPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const project = useSelector((state) => state.projects.list).find((project) => project._id === id);
  const isLoading = useSelector((state) => state.projects.isLoading);
  // const employees = useSelector((state) => state.employees.list);
  let pm = project?.members.find((member) => member.role === 'PM');
  // console.log(project);

  useEffect(() => {
    dispatch(getProjects());
    // dispatch(getEmployees());
  }, []);

  return isLoading ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Projects</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <div className={styles.box}>
        <div className={styles.field}>
          <h3>Project Name</h3>
          <p>{project?.name}</p>
        </div>
        <div className={styles.field}>
          <h3>Client</h3>
          <p>{project?.clientName}</p>
        </div>
        <div className={styles.field}>
          <h3>PM</h3>
          <p>{pm ? `${pm.employeeId?.firstName} ${pm.employeeId?.lastName}` : 'To be defined'}</p>
        </div>
        <div className={styles.field}>
          <h3>Description</h3>
          <p>{project?.description}</p>
        </div>
        <div className={styles.field}>
          <h3>Start Date</h3>
          <p>{project?.startDate?.slice(0, 10)}</p>
        </div>
        <div className={styles.field}>
          <h3>Active</h3>
          <p>{project?.active ? 'Active' : 'Inactive'}</p>
        </div>
      </div>
      <h2 className={styles.title}>Members</h2>
      <Table
        data={project?.members}
        headers={['employeeId', 'role', 'rate']}
        titles={['Name', 'Role', 'Rate']}
        modifiers={{
          employeeId: (x) => `${x.firstName} ${x.lastName}`
        }}
        delAction={(x) => console.log(x)}
        editAction={(x) => console.log(x)}
      />
    </section>
  );
};

export default ProjectPage;
