import { joiResolver } from '@hookform/resolvers/joi';
import { ButtonText, ErrorSuccessModal, Input, Select } from 'Components/Shared';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editTask } from '../../../redux/tasks/thunks';
import styles from './edit.module.css';

const taskSchema = Joi.object({
  taskName: Joi.string()
    .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Invalid task name, it must contain more than 3 letters',
      'string.max': 'Invalid task name, it must not contain more than 50 letters',
      'string.empty': 'Task name is a required field',
      'string.pattern.base':
        'Must contain only letters and words can only be separated by a single white space'
    }),
  startDate: Joi.date().required().messages({ 'any.required': 'Start date is a required field' }),
  workedHours: Joi.number().integer().min(0).required().messages({
    'number.integer': 'Invalid number, it must be an integer',
    'number.min': 'Invalid number, it must be positive',
    'number.base': 'Worked hours is a required field'
  }),
  description: Joi.string().min(6).max(150).required().messages({
    'string.min': 'Invalid description, it must contain more than 6 letters',
    'string.max': 'Invalid description, it must not contain more than 150 letters',
    'string.empty': 'Description is a required field'
  }),
  status: Joi.string()
    .min(2)
    .valid('To do', 'In progress', 'Review', 'Blocked', 'Done', 'Cancelled')
    .required()
    .messages({
      'string.min': 'Invalid status, it must contain more than 2 letters',
      'any.valid':
        'Invalid status, it must be one of the following: To do, In progress, Review, Blocked, Done, Cancelled',
      'string.empty': 'Status is a required field'
    })
});

const Edit = ({ task, closeModalForm }) => {
  const dispatch = useDispatch();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    if (
      data.taskName === task.taskName &&
      data.startDate === task.startDate &&
      data.workedHours === task.workedHours &&
      data.description === task.description &&
      data.status == task.status
    ) {
      setMessage({ message: "There haven't been any changes", data: {}, error: true });
      setShowMessageModal(true);
    } else {
      dispatch(editTask(data, task._id, setMessage)).then(() => {
        setShowMessageModal(true);
      });
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(taskSchema),
    defaultValues: {
      taskName: task.taskName,
      startDate: task.startDate,
      workedHours: task.workedHours,
      description: task.description,
      status: task.status
    }
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Task Name"
        type="text"
        name="taskName"
        placeholder="Insert task name"
        register={register}
        error={errors.taskName?.message}
      />
      <Input
        label="Start Date"
        type="date"
        name="startDate"
        register={register}
        error={errors.startDate?.message}
      />
      <Input
        label="Worked Hours"
        type="text"
        name="workedHours"
        placeholder="Insert hours"
        register={register}
        error={errors.workedHours?.message}
      />
      <Input
        label="Description"
        type="text"
        name="description"
        placeholder="Insert description"
        register={register}
        error={errors.description?.message}
      />
      <Select
        label="Status"
        name="status"
        title="Choose status"
        data={['To do', 'In progress', 'Review', 'Blocked', 'Done', 'Cancelled']}
        register={register}
        error={errors.status?.message}
      />
      <ButtonText clickAction={closeModalForm} label="Cancel"></ButtonText>
      <ButtonText clickAction={handleSubmit(onSubmit)} label="Submit"></ButtonText>
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

export default Edit;
