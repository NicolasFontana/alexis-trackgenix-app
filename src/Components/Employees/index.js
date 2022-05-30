import { useEffect, useState } from 'react';
import styles from './employees.module.css';

const Employees = () => {
  const [employees, saveEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/employees/`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        {employees.map((employee) => {
          return (
            <div href="/employees/form" key={employee._id}>
              {employee.firstName}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Employees;
