import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Preloader, Table, ButtonText, ErrorSuccessModal, Select } from 'Components/Shared';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getAllTimesheets } from 'redux/time-sheets/thunks';
import styles from './time-sheet.module.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  project: Joi.string().required().messages({
    'string.empty': 'Please select a project'
  }),
  employee: Joi.string().required().messages({
    'string.empty': 'Please select an employee'
  }),
  period: Joi.string().required().messages({
    'string.empty': 'Please select a period'
  })
});

function Timesheet() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.timesheets.isLoading);
  const employeeId = useSelector((state) => state.auth.user?.data._id);
  const employee = useSelector((state) => state.employees.list)?.find(
    (employee) => employee._id === employeeId
  );
  const projectsPM = useSelector((state) => state.projects.list)?.filter((project) =>
    project.members.find(
      (member) => member.employeeId._id === employee?._id && member.role === 'PM'
    )
  );
  const employees = useSelector((state) => state.employees?.list)?.filter((employee) =>
    projectsPM.find((project) =>
      project.members.find(
        (member) => member.employeeId._id === employee._id && member.employeeId._id !== employeeId
      )
    )
  );
  const timesheets = useSelector((state) => state.timesheets.listTimesheet)?.filter((timesheet) =>
    employees?.find((employee) =>
      employee.timeSheets.find((employeeTimesheet) => timesheet._id === employeeTimesheet._id)
    )
  );

  const [response, setResponse] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  let [filteredTimesheet, setFilteredTimesheet] = useState([]);
  let periods = timesheets?.map((timesheet) => timesheet.createdAt.slice(0, 7));

  const history = useHistory();

  const redirect = (id) => {
    history.push(`/employee/employees/time-sheet/${id}`);
  };

  let modalAdd;
  let modalDelete;

  useEffect(() => {
    dispatch(getEmployees()).then(dispatch(getProjects())).then(dispatch(getAllTimesheets()));
  }, []);

  const handleOnSubmit = (data) => {
    console.log(
      timesheets.filter((timesheet) =>
        employees
          ?.filter((employee) => data.employee === employee._id)
          .find((employee) =>
            employee.timeSheets.find((employeeTimesheet) => timesheet._id === employeeTimesheet._id)
          )
      )
    );
    setFilteredTimesheet(
      timesheets
        .filter(
          (timesheet) =>
            timesheet.projectId._id == data.project &&
            timesheet.createdAt.slice(0, 7) === data.period
        )
        .filter((timesheet) =>
          employees
            ?.filter((employee) => data.employee === employee._id)
            .find((employee) =>
              employee.timeSheets.find(
                (employeeTimesheet) => timesheet._id === employeeTimesheet._id
              )
            )
        )
    );
    if (
      !timesheets
        .filter(
          (timesheet) =>
            timesheet.projectId._id == data.project &&
            timesheet.createdAt.slice(0, 7) === data.period
        )
        .filter((timesheet) =>
          employees
            ?.filter((employee) => data.employee === employee._id)
            .find((employee) =>
              employee.timeSheets.find(
                (employeeTimesheet) => timesheet._id === employeeTimesheet._id
              )
            )
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
      employee: '',
      period: ''
    },
    shouldFocusError: false
  });

  return isLoading && !showSuccessModal ? (
    <section className={styles.containerPreloader}>
      <Preloader />
    </section>
  ) : (
    <>
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
      {timesheets.length !== 0 && (
        <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
          <Select
            label="Project"
            name="project"
            title="Select a project"
            data={projectsPM?.map((project) => ({
              _id: project._id,
              optionText: project.name
            }))}
            register={register}
            error={errors.project?.message}
          />
          <Select
            label="Employee"
            name="employee"
            title="Select a employee"
            data={employees?.map((employee) => ({
              _id: employee._id,
              optionText: `${employee.firstName} ${employee.lastName}`
            }))}
            register={register}
            error={errors.employee?.message}
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
          <ButtonText label="Search" clickAction={handleSubmit(handleOnSubmit)} />
          <ButtonText
            label="Reset"
            clickAction={() => (setFilteredTimesheet(timesheets), reset())}
          />
        </form>
      )}
      <section className={styles.container}>
        {timesheets.length ? (
          <h2 className={styles.title}> Employees Timesheets</h2>
        ) : (
          <h2 className={styles.warning}> No timesheets have been uploaded yet</h2>
        )}
        {modalAdd}
        {modalDelete}
        <div className={timesheets.length ? styles.divContainer : styles.divNoTable}>
          {timesheets.length !== 0 && (
            <Table
              data={filteredTimesheet.length ? filteredTimesheet : timesheets}
              headers={['projectId', '_id', 'approved', 'Task', 'createdAt']}
              titles={['Project', 'Employee', 'PMs approval', 'Worked hours', 'Period']}
              modifiers={{
                projectId: (x) => x?.name,
                approved: (x) => (x ? 'Approved' : 'Not approved'),
                Task: (x) =>
                  x?.reduce((previous, current) => {
                    return previous + current.taskId.workedHours;
                  }, 0),
                createdAt: (x) => x?.slice(0, 7),
                _id: (x) =>
                  employees
                    ?.filter((employee) =>
                      employee.timeSheets?.find((timesheet) => timesheet._id == x.toString())
                    )
                    .map((employee) => `${employee.firstName} ${employee.lastName}`)
              }}
              redirect={redirect}
              sort={{ projectId: 1, _id: 1, approved: 1, Task: 1, createdAt: 1 }}
              sortModifiers={{
                projectId: (x) => x?.name
                // _id: (x) =>
                //   employees
                //     ?.filter((employee) =>
                //       employee.timeSheets?.find((timesheet) => timesheet._id == x.toString())
                //     )
                //     .map((employee) => `${employee.firstName} ${employee.lastName}`)
                // Task: (x) =>
                //   x?.reduce((previous, current) => {
                //     return previous + current.taskId.workedHours;
                //   }, 0)
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
          successResponse={response}
        />
      </section>
    </>
  );
}

export default Timesheet;
