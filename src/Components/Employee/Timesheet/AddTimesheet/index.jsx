import { React, useState } from 'react';
import styles from './form.module.css';
import { Select, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { createTimesheet } from 'redux/time-sheets/thunks';
import { updateEmployee } from 'redux/employees/thunks';
import * as Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const timesheetValidation = Joi.object({
  project: Joi.string()
    .messages({
      'string.empty': 'Project is a required field'
    })
    .required(),
  task: Joi.string().allow(''),
  approved: Joi.boolean().required()
});

const FormAdd = ({ closeModalForm, employee, timesheets, setFilteredTimesheet }) => {
  const dispatch = useDispatch();
  let currentDate = new Date().toISOString().slice(0, 7);
  const [message, setMessage] = useState('');
  const [employeeResponse, setEmployeeResponse] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const projects = employee.projects?.filter(
    (project) =>
      !timesheets?.some(
        (timesheet) =>
          timesheet.projectId._id === project._id && timesheet.createdAt.slice(0, 7) === currentDate
      )
  );

  const onSubmit = (data) => {
    let dataToSave;
    dispatch(
      createTimesheet(data.project, (message) => (setMessage(message), (dataToSave = message.data)))
    ).then(() => {
      let body = JSON.stringify({
        timeSheets: employee.timeSheets.map((timesheet) => timesheet._id).concat(dataToSave._id)
      });
      dispatch(updateEmployee(body, employee._id, setEmployeeResponse)).then(() =>
        setShowMessageModal(true)
      );
    });
    setFilteredTimesheet([]);
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(timesheetValidation),
    defaultValues: {
      project: '',
      task: '',
      approved: false
    },
    shouldFocusError: false
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {projects.length ? (
        <>
          <Select
            label="Projects available"
            name="project"
            title="Choose project"
            data={projects.map((project) => ({
              _id: project._id,
              optionText: project.name
            }))}
            register={register}
            error={errors.project?.message}
          />
          <ButtonText clickAction={handleSubmit(onSubmit)} label="Create" />
        </>
      ) : (
        <>
          <p> All the projects have already a timesheet for the {currentDate} period. </p>
        </>
      )}
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={() => {
          setShowMessageModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={{
          message: `${message.message}.\n${employeeResponse.message}.`,
          error: message.error
        }}
      />
    </form>
  );
};

export default FormAdd;
