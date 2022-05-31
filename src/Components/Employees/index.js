import { useEffect, useState } from 'react';
import Modal from './Modal';
import styles from './employees.module.css';

const Employees = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, saveEmployees] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/employees/`)
      .then((response) => response.json())
      .then((response) => {
        saveEmployees(response.data);
      });
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <div>
        {employees.map((employee) => {
          return <div key={employee._id}>{employee.firstName}</div>;
        })}
      </div>
      <Modal show={showModal} closeModal={closeModal} />
      <img
        onClick={() => {
          setShowModal(true);
        }}
        src={`${process.env.PUBLIC_URL}/assets/images/add-icon.svg`}
      />
    </section>
  );
};

export default Employees;
