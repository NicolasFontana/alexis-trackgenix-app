import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask } from '../../../redux/tasks/thunks';
import Button from '../../Shared/Buttons/ButtonText';
import MessageModal from '../../Shared/ErrorSuccessModal';
import Input from '../../Shared/Input';
import Select from '../../Shared/Select';
import styles from './form.module.css';

const taskSchema = Joi.object({
  taskName: Joi.string()
    .regex(/^([a-zA-Z]+\s)*[a-zA-Z]+$/)
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.min': 'Invalid task name, it must contain more than 3 letters',
      'string.max': 'Invalid task name, it must not contain more than 50 letters',
      'any.required': 'Task name is a required field',
      'string.empty': 'First name is not allowed to be empty',
      'string.pattern.base':
        'Must contain only letters and words can only be separated by a single white space'
    }),
  startDate: Joi.date().required().messages({ 'any.required': 'Start date is a required field' }),
  workedHours: Joi.number().integer().min(0).required().messages({
    'number.integer': 'Invalid number, it must be an integer',
    'number.min': 'Invalid number, it must be positive',
    'any.required': 'Worked hours is a required field'
  }),
  description: Joi.string().min(6).max(150).required().messages({
    'string.min': 'Invalid description, it must contain more than 6 letters',
    'string.max': 'Invalid description, it must not contain more than 150 letters',
    'any.required': 'Description is a required field'
  }),
  status: Joi.string()
    .min(2)
    .valid('To do', 'In progress', 'Review', 'Blocked', 'Done', 'Cancelled')
    .required()
    .messages({
      'string.min': 'Invalid status, it must contain more than 2 letters',
      'any.valid':
        'Invalid status, it must be one of the following: To do, In progress, Review, Blocked, Done, Cancelled',
      'any.required': 'Status is a required field'
    })
});

const Form = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    let newTask = JSON.stringify({
      taskName: data.taskName,
      startDate: data.startDate,
      workedHours: data.workedHours,
      description: data.description,
      status: data.status
    });
    dispatch(addTask(newTask, setMessage)).then(() => {
      setShowMessageModal(true);
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(taskSchema),
    defaultValues: {
      taskName: '',
      startDate: '',
      workedHours: '',
      description: '',
      status: ''
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
      <Button
        clickAction={() => {
          closeModalForm();
        }}
        label="Cancel"
      >
        Cancel
      </Button>
      <Button clickAction={handleSubmit(onSubmit)} label="Submit">
        Create
      </Button>
      <MessageModal
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
