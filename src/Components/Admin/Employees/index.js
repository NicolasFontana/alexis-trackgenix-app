import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, deleteEmployee } from 'redux/employees/thunks';
import { getProjects, updateProject } from 'redux/projects/thunks';
import { useHistory, generatePath } from 'react-router-dom';
import styles from './employees.module.css';
import Form from './Form';
import {
  Preloader,
  Table,
  ModalForm,
  Select,
  ConfirmModal,
  ErrorSuccessModal
} from 'Components/Shared';

const Employees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const projects = useSelector((state) => state.projects.list);
  const employeeLoading = useSelector((state) => state.employees.isLoading);
  const projectsLoading = useSelector((state) => state.projects.isLoading);

  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [showModalFormDelete, setShowModalFormDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const [employeeId, setEmployeeId] = useState();

  let history = useHistory();
  let modalEdit;
  let modalDelete;

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, [showModalFormDelete === false]);

  const handleConfirm = () => {
    dispatch(deleteEmployee(employeeId, setResponse)).then(() => {
      setShowModalFormDelete(false);
      setShowSuccessModal(true);
    });
    projects.forEach((project) => {
      project.members.forEach((member) => {
        if (member.employeeId._id === employeeId) {
          dispatch(
            updateProject(
              project._id,
              {
                members: project.members
                  .filter((member) => member.employeeId._id != employeeId)
                  .map((member) => ({
                    employeeId: member.employeeId._id,
                    role: member.role,
                    rate: member.rate
                  }))
              },
              setResponse
            )
          );
        }
      });
    });
  };

  const redirectAction = (id) => {
    history.push(generatePath('/admin/employees/:id', { id }));
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Employee">
        <Form
          closeModalForm={closeModalFormEdit}
          edit={true}
          item={employees.find((item) => item._id === employeeId)}
        />
      </ModalForm>
    );
  }

  if (showModalFormDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalFormDelete}
        handleClose={() => {
          setShowModalFormDelete(false);
        }}
        confirmDelete={handleConfirm}
        title="Delete Employee"
        message={'Are you sure you want to delete this employee?'}
      />
    );
  }

  return employeeLoading &&
    projectsLoading &&
    !showModalFormEdit &&
    !showModalFormDelete &&
    !showSuccessModal ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Employees</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.employees}> Employees </h2>
      <Table
        data={employees}
        headers={['firstName', 'lastName', 'phone', 'email', 'active', 'projects']}
        titles={['First Name', 'Last Name', 'Phone', 'Email', 'Active', 'Projects']}
        delAction={(id) => {
          setEmployeeId(id);
          setShowModalFormDelete(true);
        }}
        modifiers={{
          active: (x) => (x ? 'Active' : 'Inactive'),
          isProjectManager: (x) => (x ? 'Yes' : 'No'),
          projects: (x) => (
            <Select
              title="Projects"
              defaultValue=""
              data={[...x.map((project) => project.name)]}
              disabled
              register={console.log}
            />
          )
        }}
        redirect={redirectAction}
      />
      {modalEdit}
      {modalDelete}
      {employeeLoading ? <Preloader /> : null}
      <ErrorSuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={() => {
          setShowSuccessModal(false);
        }}
        successResponse={response}
      />
    </section>
  );
};

export default Employees;
