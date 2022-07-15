import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'Components/Shared';
import styles from './projects.module.css';
import { getProjects } from 'redux/projects/thunks';
import { useEffect } from 'react';

function Projects() {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.auth.user?.data);
  const projects = useSelector((state) => state.projects.list).filter((project) =>
    employee?.projects.some((employeeProject) => employeeProject === project._id)
  );
  const projectsPM = projects.filter((project) =>
    project.members.find((member) => member.employeeId._id === employee._id && member.role === 'PM')
  );

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <>
      {projectsPM.length ? (
        <section className={styles.container}>
          <h2 className={styles.title}>PM Projects</h2>
          <Table
            data={projectsPM}
            headers={['name', 'clientName', 'startDate', 'endDate', 'active']}
            titles={['Project name', 'Client', 'Start Date', 'End Date', 'Active']}
            modifiers={{
              startDate: (x) => x?.slice(0, 10),
              endDate: (x) => x?.slice(0, 10),
              active: (x) => (x ? 'Active' : 'Inactive')
            }}
            editAction={console.log}
          />
        </section>
      ) : null}
      <section className={styles.container}>
        <h2 className={styles.title}>All Projects</h2>
        {projects.length ? (
          <Table
            data={projects}
            headers={['name', 'clientName', 'startDate', 'endDate', 'active', 'members']}
            titles={['Project name', 'Client', 'Start Date', 'End Date', 'Active', 'Role']}
            modifiers={{
              startDate: (x) => x?.slice(0, 10),
              endDate: (x) => x?.slice(0, 10),
              active: (x) => (x ? 'Active' : 'Inactive'),
              members: (x) => x.find((e) => e.employeeId._id === employee._id)?.role
            }}
          />
        ) : (
          <p> You have not been assigned to any project yet </p>
        )}
      </section>
    </>
  );
}

export default Projects;
