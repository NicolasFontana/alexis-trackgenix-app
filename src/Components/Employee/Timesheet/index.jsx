import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Preloader,
  Table,
  ConfirmModal,
  ButtonText,
  ModalForm,
  ErrorSuccessModal,
  ScrollToTop,
  Select
} from 'Components/Shared';
import FormAdd from './AddTimesheet';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getAllTimesheets, deleteTimesheet } from 'redux/time-sheets/thunks';
import styles from './time-sheet.module.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  project: Joi.string().required().messages({
    'string.empty': 'Please select a project'
  }),
  period: Joi.string().required().messages({
    'string.empty': 'Please select a period'
  })
});

function Timesheet() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.projects.isLoading);
  const employeeId = useSelector((state) => state.auth.user?.data._id);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === employeeId
  );
  const projectsPM = useSelector((state) => state.projects.list)?.filter((project) =>
    project.members.find((member) => member.employeeId._id === employeeId && member.role === 'PM')
  );
  const timesheets = useSelector((state) => state.timesheets.listTimesheet)?.filter(
    (listTimesheet) =>
      employee?.timeSheets.some((employeeTimesheet) => employeeTimesheet._id === listTimesheet._id)
  );
  const projects = useSelector((state) => state.projects.list)?.filter((project) =>
    timesheets?.some((timesheet) => timesheet.projectId._id === project._id)
  );

  const [response, setResponse] = useState('');
  const [timeSheetId, setTimeSheetId] = useState();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState();
  let [filteredTimesheet, setFilteredTimesheet] = useState([]);
  let periods = timesheets?.map((timesheet) => timesheet.createdAt.slice(0, 7));

  const history = useHistory();

  const redirect = (id) => {
    history.push(`/employee/time-sheet/${id}`);
  };

  let modalAdd;
  let modalDelete;

  useEffect(() => {
    dispatch(getAllTimesheets()).then(dispatch(getEmployees())).then(dispatch(getProjects()));
  }, [showSuccessModal === false && showModalDelete === false && showModalAdd === false]);

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  if (showModalDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalDelete}
        handleClose={() => {
          setShowModalDelete(false);
        }}
        confirmDelete={() => {
          dispatch(deleteTimesheet(timeSheetId, setResponse)).then(() => {
            setShowModalDelete(false);
            setShowSuccessModal(true);
          });
        }}
        title="Delete Timesheet"
        message="Are you sure you want to delete this timesheet?"
      />
    );
  }

  if (showModalAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalAdd} handleClose={closeModalAdd} title="Add Timesheet">
        <FormAdd
          closeModalForm={closeModalAdd}
          employee={employee}
          timesheets={timesheets}
          setFilteredTimesheet={setFilteredTimesheet}
        />
      </ModalForm>
    );
  }

  const handleOnSubmit = (data) => {
    setFilteredTimesheet(
      timesheets.filter(
        (timesheet) =>
          timesheet.projectId._id == data.project && timesheet.createdAt.slice(0, 7) === data.period
      )
    );
    if (
      !timesheets.filter(
        (timesheet) =>
          timesheet.projectId._id == data.project && timesheet.createdAt.slice(0, 7) === data.period
      ).length
    ) {
      setResponse({
        message: 'Timesheet not found',
        error: true
      });
      setShowSuccessModal(true);
      reset();
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      project: '',
      period: ''
    },
    shouldFocusError: false
  });

  return isLoading && !showModalAdd && !showModalDelete && !showSuccessModal ? (
    <section className={styles.containerPreloader}>
      <Preloader />
    </section>
  ) : (
    <div>
      {projectsPM.length !== 0 && (
        <div className={styles.buttonContainer}>
          <ButtonText
            label={'Show my timesheets'}
            clickAction={() => history.push('/employee/time-sheet/')}
          />
          <ButtonText
            label={'Show Employees timesheets'}
            clickAction={() => history.push('/employee/employees/time-sheet/')}
          />
        </div>
      )}
      {timesheets.length !== 0 && (
        <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
          <Select
            label="Project"
            name="project"
            title="Select a project"
            data={projects?.map((project) => ({
              _id: project._id,
              optionText: project.name
            }))}
            register={register}
            error={errors.project?.message}
          />
          <Select
            label="Period"
            name="period"
            title="Select a period"
            data={periods.filter((item, index) => {
              return periods.indexOf(item) === index;
            })}
            register={register}
            error={errors.period?.message}
          />
          <div className={styles.formBtnContainer}>
            <ButtonText label="Search" clickAction={handleSubmit(handleOnSubmit)} />
            <ButtonText
              label="Reset"
              clickAction={() => (setFilteredTimesheet(timesheets), reset())}
            />
          </div>
        </form>
      )}
      <section className={styles.container}>
        {timesheets.length ? (
          <h2 className={styles.title}> My Timesheets</h2>
        ) : (
          <h2 className={styles.warning}> No timesheets have been uploaded yet</h2>
        )}
        {modalAdd}
        {modalDelete}
        <div className={timesheets.length ? styles.divContainer : styles.divNoTable}>
          <ButtonText
            clickAction={() => {
              setShowModalAdd(true), setFilteredTimesheet([]);
            }}
            label="Add Timesheet"
          />
          {timesheets.length !== 0 && (
            <Table
              data={filteredTimesheet.length ? filteredTimesheet : timesheets}
              headers={['projectId', 'Task', 'createdAt']}
              titles={['Project', 'Worked hours', 'Period']}
              delAction={(id) => {
                setTimeSheetId(id);
                setShowModalDelete(true);
                setFilteredTimesheet([]);
              }}
              modifiers={{
                projectId: (x) => x?.name,
                Task: (x) =>
                  x?.reduce((previous, current) => {
                    return previous + current.taskId.workedHours;
                  }, 0),
                createdAt: (x) => x?.slice(0, 7)
              }}
              redirect={redirect}
              sort={{ projectId: 1, approved: 1, Task: 1, createdAt: 1 }}
              sortModifiers={{
                projectId: (x) => x?.name,
                Task: (x) =>
                  x?.reduce((previous, current) => {
                    return previous + current.taskId.workedHours;
                  }, 0),
                createdAt: (x) => x?.slice(0, 7)
              }}
            />
          )}
        </div>
        <ErrorSuccessModal
          show={showSuccessModal}
          closeModal={() => {
            setShowSuccessModal(false);
          }}
          closeModalForm={() => {
            setShowSuccessModal(false);
          }}
          successResponse={{
            message: response.error
              ? response.message
              : 'The timesheet has been successfully deleted',
            error: response.error
          }}
        />
      </section>
      <ScrollToTop />
    </div>
  );
}

export default Timesheet;
