import { useSelector } from 'react-redux';
import { Table } from 'Components/Shared';
import styles from './projects.module.css';

function Projects() {
  const employeeId = useSelector((state) => state.auth.user?.data._id);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === employeeId
  );
  const projects = useSelector((state) => state.projects.list).filter((listProject) =>
    employee?.projects.some((employeeProject) => employeeProject._id === listProject._id)
  );

  projects.forEach(
    (project) =>
      (project.employeeRole = project.members.find((e) => e.employeeId._id === employeeId)?.role)
  );

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employee Projects</h2>
      <Table
        data={projects}
        headers={[
          'name',
          'clientName',
          'startDate',
          'endDate',
          'active',
          'employeeRole',
          'members'
        ]}
        titles={['Project', 'Client Name', 'Start Date', 'End Date', 'Active', 'Role', 'Rate']}
        modifiers={{
          startDate: (x) => x?.slice(0, 10),
          endDate: (x) => x?.slice(0, 10),
          active: (x) => (x ? 'Active' : 'Inactive'),
          members: (x) => x.find((e) => e.employeeId._id === employeeId)?.rate
        }}
      />
    </section>
  );
}

export default Projects;
