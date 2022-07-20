import { React, useState } from 'react';
import styles from './form.module.css';
import { Select, Input, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import { useDispatch, useSelector } from 'react-redux';
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
  task: Joi.string()
    .messages({
      'string.empty': 'Task is a required field'
    })
    .required(),
  approved: Joi.boolean().required()
});

const FormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const projects = useSelector((state) => state.projects.list);
  const tasks = useSelector((state) => state.tasks.list);
  const employeeId = useSelector((state) => state.auth.user?.data._id);

  const onSubmit = (data) => {
    let dataToSave;
    dispatch(
      createTimesheet(
        data.project,
        data.task,
        data.approved,
        (message) => (setMessage(message), (dataToSave = message.data))
      )
    ).then(() => {
      setShowMessageModal(true);
      let body = JSON.stringify({
        timeSheets: [dataToSave._id]
      });
      dispatch(updateEmployee(body, employeeId, setMessage)).then(() => {
        setShowMessageModal(true);
      });
    });
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
      <Select
        label="Projects"
        name="project"
        title="Choose project"
        data={projects.map((project) => ({
          _id: project._id,
          optionText: project.name
        }))}
        register={register}
        error={errors.project?.message}
      />
      <Select
        label="Tasks"
        name="task"
        title="Choose task"
        data={tasks.map((task) => ({
          _id: task._id,
          optionText: task.taskName
        }))}
        register={register}
        error={errors.task?.message}
      />
      <Input
        label="Approved"
        name="approved"
        type="checkbox"
        register={register}
        error={errors.approved?.message}
      />
      <ButtonText clickAction={handleSubmit(onSubmit)} label="Create" />
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={() => {
          setShowMessageModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={message}
      />
    </form>
  );
};

export default FormAdd;
