import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects, delEmployeeFromProject } from 'redux/projects/thunks';
import { Preloader, Table, ModalForm, ConfirmModal, ErrorSuccessModal } from 'Components/Shared';
import EditForm from 'Components/Admin/Employees/EditForm';
import styles from 'Components/Admin/Employees/EmployeePage/employeePage.module.css';

const EmployeePage = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const projects = useSelector((state) => state.projects.list);
  const employeeLoading = useSelector((state) => state.employees.isLoading);
  const projectsLoading = useSelector((state) => state.projects.isLoading);

  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');
  const [idDelete, setIdDelete] = useState(0);
  const [idToEdit, setIdToEdit] = useState();

  let employee;
  let employeeProjects = []; //the data of the projects will be loaded here
  let modalEdit;
  let modalMessage;

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
            name: project.name,
            role: member.role,
            rate: member.rate
          });
        }
      });
    });
    console.log(employeeProjects);
  }

  const handleConfirm = () => {
    dispatch(delEmployeeFromProject(idDelete, (response) => setMessage(response))).then(() => {
      setShowConfirmModal(false);
      setShowMessageModal(true);
    });
    console.log('Falta crear thunk para esta accion');
  };

  const openConfirmModal = (id) => {
    setShowConfirmModal(true);
    setIdDelete(id);
  };

  // const openAddModal = () => {
  //   setShowModalFormAdd(true);
  // };

  const openEditModal = (id) => {
    setIdToEdit(id);
    setShowModalFormEdit(true);
  };

  const closeModal = () => {
    setShowMessageModal(false);
    // setShowModalFormAdd(false);
    setShowModalFormEdit(false);
    setShowConfirmModal(false);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModal} title="Edit Task">
        <EditForm
          closeModalForm={closeModal}
          project={employeeProjects.find((project) => project._id === idToEdit)}
        />
      </ModalForm>
    );
  }

  if (showConfirmModal) {
    modalMessage = (
      <ConfirmModal
        isOpen={showConfirmModal}
        handleClose={closeModal}
        confirmDelete={handleConfirm}
        title="Delete Task"
        message="¿Are you sure you want to delete this employee from the project?"
      />
    );
  }

  return employeeLoading && projectsLoading && !showConfirmModal ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Employee Page</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      {modalEdit}
      {modalMessage}
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
      </div>
      <Table
        data={employeeProjects}
        headers={['name', 'role', 'rate']}
        titles={['Name', 'Role', 'Rate']}
        modifiers={{}}
        delAction={openConfirmModal}
        editAction={openEditModal}
      />
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModal}
        successResponse={message}
      />
    </section>
  );
};

export default EmployeePage;
