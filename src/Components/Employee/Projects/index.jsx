import { useDispatch, useSelector } from 'react-redux';
import { Table, ModalForm, Preloader, ButtonText } from 'Components/Shared';
import Form from './Form';
import styles from './projects.module.css';
import { getProjects } from 'redux/projects/thunks';
import { useEffect, useState } from 'react';
import { useHistory, generatePath } from 'react-router-dom';

function Projects() {
  const dispatch = useDispatch();
  let history = useHistory();
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
  const [open, setOpen] = useState(false);
  let modalEdit;

  useEffect(() => {
    dispatch(getProjects());
  }, [showModalFormEdit === false]);

  const redirectAction = (id) => {
    history.push(generatePath('/employee/projects/:id', { id }));
  };

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
    <div className={styles.maincontainer}>
      {projectsPM.length || projects.length ? (
        <>
          {projectsPM.length ? (
            <ButtonText
              label={open ? 'Show all projects' : 'Show PM projects'}
              clickAction={() => setOpen(!open)}
            />
          ) : null}
          <section className={styles.container}>
            {open && (
              <>
                <h2 className={styles.title}>PM Projects</h2>
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
                  redirect={redirectAction}
                />
              </>
            )}
            {modalEdit}
            {!open && (
              <>
                <h2 className={styles.title}>All Projects</h2>
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
                  redirect={redirectAction}
                />
              </>
            )}
          </section>
        </>
      ) : (
        <h3 className={styles.subtitle}> You have not been assigned to any project yet </h3>
      )}
    </div>
  );
}

export default Projects;
