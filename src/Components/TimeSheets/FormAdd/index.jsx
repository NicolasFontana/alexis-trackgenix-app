import { useState } from 'react';
import styles from './form.module.css';
import Select from '../../Shared/Select/index';
import Input from '../../Shared/Input/index';
import ButtonText from '../../Shared/Buttons/ButtonText/index';
import ErrorSuccessModal from '../../Shared/ErrorSuccessModal/index';
import { useDispatch, useSelector } from 'react-redux';
import { createTimesheet } from '../../../redux/time-sheets/thunks';
import * as Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const timesheetValidation = Joi.object({
  project: Joi.string()
    .messages({
      'string.empty': 'Project id is a required field'
    })
    .required(),
  task: Joi.string()
    .messages({
      'string.empty': 'Task id is a required field'
    })
    .required(),
  approved: Joi.boolean().required()
});

const FormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const listProject = useSelector((state) => state.projects.list);
  const listTask = useSelector((state) => state.tasks.list);

  const onSubmit = (data) => {
    dispatch(createTimesheet(data.project, data.task, data.approved, setMessage)).then(() => {
      setShowMessageModal(true);
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timesheetValidation),
    defaultValues: {
      project: '',
      task: '',
      approved: false
    }
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Projects"
        name="project"
        title="Choose project"
        data={listProject.map((project) => ({
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
        data={listTask.map((task) => ({
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
