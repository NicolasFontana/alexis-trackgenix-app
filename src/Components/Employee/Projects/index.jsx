import { useDispatch, useSelector } from 'react-redux';
import { Table, ModalForm, Preloader } from 'Components/Shared';
import Form from './Form';
import styles from './projects.module.css';
import { getProjects } from 'redux/projects/thunks';
import { useEffect, useState } from 'react';

function Projects() {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.auth.user?.data);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const projects = useSelector((state) => state.projects.list).filter((project) =>
    employee?.projects.some((employeeProject) => employeeProject === project._id)
  );
  const projectsPM = projects.filter((project) =>
    project.members.find((member) => member.employeeId._id === employee._id && member.role === 'PM')
  );
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);
  const [projectId, setProjectId] = useState();
  let modalEdit;

  useEffect(() => {
    dispatch(getProjects());
  }, [showModalFormEdit === false]);

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  const openModalFormEdit = (id) => {
    setProjectId(id);
    setShowModalFormEdit(true);
  };

  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Project">
        <Form
          closeModalForm={closeModalFormEdit}
          edit={true}
          project={projectsPM.find((project) => project._id == projectId)}
          projectID={projectId}
        />
      </ModalForm>
    );
  }

  return isLoading && !showModalFormEdit ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Projects</p>
      </Preloader>
    </section>
  ) : (
    <>
      {projectsPM.length ? (
        <section className={styles.container}>
          <h2 className={styles.title}>PM Projects</h2>
          {modalEdit}
          <Table
            data={projectsPM}
            headers={['name', 'clientName', 'startDate', 'endDate', 'active']}
            titles={['Project name', 'Client', 'Start Date', 'End Date', 'Active']}
            modifiers={{
              startDate: (x) => x?.slice(0, 10),
              endDate: (x) => (x ? x.slice(0, 10) : 'To be defined'),
              active: (x) => (x ? 'Active' : 'Inactive')
            }}
            editAction={openModalFormEdit}
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
              endDate: (x) => (x ? x.slice(0, 10) : 'To be defined'),
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
