import { ButtonText, ErrorSuccessModal, Input, Select } from 'Components/Shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from 'redux/tasks/thunks';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import styles from './form.module.css';
import { putTimesheet } from 'redux/time-sheets/thunks';

const taskSchema = Joi.object({
  taskName: Joi.string().min(3).max(50).required().messages({
    'string.min': 'Invalid task name, it must contain more than 3 characters',
    'string.max': 'Invalid task name, it must not contain more than 50 characters',
    'string.empty': 'Task name is a required field',
    'string.pattern.base':
      'Must contain only letters and words can only be separated by a single white space'
  }),
  startDate: Joi.date().min('01/01/1950').max('12/31/2050').required().messages({
    'date.base': 'Start date is a required field',
    'date.min': 'Invalid start date',
    'date.max': 'Invalid start date, it must not be over the current date'
  }),
  workedHours: Joi.string()
    .pattern(/^[0-9]*$/)
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

const Form = ({ closeModalForm, timesheet, edit, task }) => {
  const dispatch = useDispatch();
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [taskResponse, setTaskResponse] = useState('');
  const [, setTimesheetResponse] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    if (edit) {
      if (
        data.taskName === task.taskName &&
        data.startDate.toString() == new Date(task.startDate) &&
        data.workedHours === task.workedHours.toString() &&
        data.description === task.description &&
        data.status == task.status
      ) {
        setMessage({ message: "There hasn't been any changes", data: {}, error: true });
        setShowMessageModal(true);
      } else {
        dispatch(editTask(data, task._id, setMessage)).then(() => {
          setShowMessageModal(true);
        });
      }
    } else {
      let taskData;
      let newTask = {
        taskName: data.taskName,
        startDate: data.startDate,
        workedHours: data.workedHours,
        description: data.description,
        status: data.status
      };
      dispatch(addTask(newTask, (message) => (setTaskResponse(message), (taskData = message.data))))
        .then(() => {
          setShowMessageModal(true);
        })
        .then(() => {
          let taskToSave = timesheet.Task.map((task) => ({ taskId: task.taskId._id })).concat({
            taskId: taskData._id
          });
          dispatch(
            putTimesheet(
              {
                Task: taskToSave
              },
              timesheet._id,
              setTimesheetResponse
            )
          );
        });
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(taskSchema),
    defaultValues: {
      taskName: edit ? task.taskName : '',
      startDate: edit ? task.startDate?.slice(0, 10) : '',
      workedHours: edit ? task.workedHours.toString() : '',
      description: edit ? task.description : '',
      status: edit ? task.status : ''
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
        clickAction={handleSubmit(onSubmit)}
        label={edit ? 'Edit' : 'Create'}
      ></ButtonText>
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={() => {
          setShowMessageModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={
          edit
            ? message
            : {
                message: `${taskResponse.message}\n${
                  taskResponse.error
                    ? taskResponse.message
                    : 'The task has been added to the timesheet'
                }`,
                data: taskResponse.data,
                error: taskResponse.error
              }
        }
      />
    </form>
  );
};

export default Form;
