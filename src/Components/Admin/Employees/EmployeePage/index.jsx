import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, generatePath } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { Preloader, Table, ButtonText } from 'Components/Shared';
import styles from 'Components/Admin/Employees/EmployeePage/employeePage.module.css';

const EmployeePage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const projects = useSelector((state) => state.projects.list);
  const employeeLoading = useSelector((state) => state.employees.isLoading);
  const projectsLoading = useSelector((state) => state.projects.isLoading);

  let employee;
  let employeeProjects = []; //the data of the projects will be loaded here
  let history = useHistory();

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, []);

  if (employees && projects) {
    const { id } = useParams();
    employee = employees.find((element) => element._id === id);
    //employeeProjects is filled
    projects.forEach((project) => {
      project.members.forEach((member) => {
        if (member.employeeId._id === employee._id) {
          employeeProjects.push({
            _id: project._id,
            employeeId: member.employeeId._id,
            name: project.name,
            role: member.role,
            rate: member.rate
          });
        }
      });
    });
  }

  const redirectAction = (id) => {
    history.push(generatePath('/admin/projects/:id', { id }));
  };

  return employeeLoading && projectsLoading ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Employee Page</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <ButtonText
        label="Go back"
        clickAction={() => {
          history.push('/admin/employees');
        }}
      ></ButtonText>
      <div className={styles.information}>
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
          <p>{employee.dni ? employee.dni : 'was not defined'}</p>
        </div>
        <div className={styles.field}>
          <h3>Date of Birth</h3>
          <p>{employee.dateBirth ? employee.dateBirth.substring(0, 10) : 'was not defined'}</p>
        </div>
        <div className={styles.field}>
          <h3>Address</h3>
          <p>{employee.address ? employee.address : 'was not defined'}</p>
        </div>
        <div className={styles.field}>
          <h3>Phone</h3>
          <p>{employee.phone ? employee.phone : 'was not defined'}</p>
        </div>
        <div className={styles.field}>
          <h3>Email</h3>
          <p>{employee.email ? employee.email : 'was not defined'}</p>
        </div>
        <div className={styles.field}>
          <h3>Status</h3>
          <p>{employee.status ? employee.status : 'was not defined'}</p>
        </div>
      </div>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.table}>
        <Table
          data={employeeProjects}
          headers={['name', 'role', 'rate']}
          titles={['Project Name', 'Role', 'Rate']}
          modifiers={{}}
          redirect={redirectAction}
        />
      </div>
    </section>
  );
};

export default EmployeePage;
