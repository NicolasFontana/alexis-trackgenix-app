import { joiResolver } from '@hookform/resolvers/joi';
import { ButtonText, ErrorSuccessModal, Input, Select } from 'Components/Shared';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../../redux/tasks/thunks';
import styles from './form.module.css';

const taskSchema = Joi.object({
  taskName: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Invalid task name, it must contain more than 3 characters',
    'string.max': 'Invalid task name, it must not contain more than 50 characters',
    'string.empty': 'Task name is a required field',
    'string.pattern.base':
      'Must contain only letters and words can only be separated by a single white space'
  }),
  startDate: Joi.date()
    .min(1950 - 1 - 1)
    .max('now')
    .required()
    .messages({
      'date.base': 'Start date is a required field',
      'date.min': 'Invalid start date',
      'date.max': 'Invalid start date, it must not be over the current date'
    }),
  workedHours: Joi.string()
    .regex(/^[0-9]*$/)
    .min(1)
    .max(3)
    .required()
    .messages({
      'string.min': 'Invalid number, it must be positive',
      'string.max': 'Invalid number, it exceeds the number of posible worked hours',
      'string.pattern.base': 'Invalid, it must contain only integer numbers',
      'string.empty': 'Worked hours is a required field'
    }),
  description: Joi.string()
    .min(6)
    .max(150)
    .required()
    .pattern(/(.*[a-zA-Z]){4}/)
    .messages({
      'string.min': 'Invalid description, it must contain more than 6 characters',
      'string.max': 'Invalid description, it must not contain more than 150 characters',
      'string.empty': 'Description is a required field',
      'string.pattern.base': 'Task description must contain at least 4 letters'
    }),
  status: Joi.string().min(2).valid('Pending', 'Done', 'Unfinished').required().messages({
    'string.min': 'Invalid status, it must contain more than 2 characters',
    'any.only': 'Invalid status, it must be one of the following: Pending, Done, Unfinished',
    'string.empty': 'Status is a required field'
  })
});

const Form = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    let newTask = {
      taskName: data.taskName,
      startDate: data.startDate,
      workedHours: data.workedHours,
      description: data.description,
      status: data.status
    };

    dispatch(addTask(newTask, setMessage)).then(() => {
      setShowMessageModal(true);
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(taskSchema),
    defaultValues: {
      taskName: '',
      startDate: '',
      workedHours: '',
      description: '',
      status: ''
    },
    shouldFocusError: false
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
        data={['Pending', 'Done', 'Unfinished']}
        register={register}
        error={errors.status?.message}
      />
      <ButtonText
        clickAction={() => {
          closeModalForm();
        }}
        label="Cancel"
      ></ButtonText>
      <ButtonText clickAction={handleSubmit(onSubmit)} label="Create"></ButtonText>
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

export default Form;
