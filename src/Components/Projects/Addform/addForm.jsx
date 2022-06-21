import React from 'react';
import { useState } from 'react';
import styles from './add.form.module.css';
import Button from '../../Shared/Buttons/ButtonText';
import Textarea from '../../Shared/Textarea/index';
import Input from '../../Shared/Input';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../redux/projects/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]*$/)
    .messages({
      'string.min': 'Invalid project name, it must contain more than 3 letters',
      'string.max': 'Invalid project name, it must not contain more than 50 letters',
      'string.pattern': 'Invalid project name, it must contain only letters'
    })
    .required(),
  description: Joi.string()
    .min(4)
    .message('Invalid description, it must contain more than 4 letters')
    .required(),
  startDate: Joi.date().required(),
  endDate: Joi.date()
    .greater(Joi.ref('startDate'))
    .message('Invalid end date, it must be after the start date')
    .required(),
  clientName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]*$/)
    .messages({
      'string.min': 'Invalid client name, it must contain more than 3 letters',
      'string.max': 'Invalid client name, it must not contain more than 50 letters',
      'string.pattern': 'Invalid client name, it must contain only letters'
    })
    .required(),
  active: Joi.boolean().required(),
  members: Joi.array().items({
    employeeId: Joi.string()
      .alphanum()
      .length(24)
      .messages({
        'string.alphanum': 'Invalid employee id, it must contain both letters and numbers',
        'string.length': 'Invalid employee id, it must contain 24 characters'
      })
      .required(),
    role: Joi.string().valid('QA', 'DEV', 'TL', 'PM').required(),
    rate: Joi.number()
      .min(0)
      .max(999999)
      .messages({
        'number.min': 'Invalid rate, it must be positive',
        'number.max': 'Invalid rate, it must be between 0 and 999999'
      })
      .required()
  })
});

const AddForm = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  const [response, setResponse] = useState('');
  const submitAdd = (data) => {
    let newProject = JSON.stringify({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      clientName: data.clientName,
      active: data.active,
      description: data.description
    });
    dispatch(addProject(newProject, setResponse)).then(() => setModalErrorSuccess(true));
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      clientName: '',
      active: true,
      description: ''
    }
  });

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(submitAdd)}>
        <Input
          label="Project Name"
          type="text"
          name="name"
          placeholder="Insert project name"
          required={true}
          register={register}
          error={errors.name?.message}
        />
        <Input
          label="Client"
          type="text"
          name="clientName"
          placeholder="Insert client name"
          required={true}
          register={register}
          error={errors.clientName?.message}
        />
        <Input
          label="Start Date"
          type="date"
          name="startDate"
          required={true}
          register={register}
          error={errors.startDate?.message}
        />
        <Input
          label="End Date"
          type="date"
          name="endDate"
          required={true}
          register={register}
          error={errors.endDate?.message}
        />

        <Textarea
          label="Description"
          type="text"
          name="description"
          placeholder="Add a description of the project"
          required={true}
          register={register}
          error={errors.description?.message}
        />
        <Input
          label="Active"
          name="active"
          type="checkbox"
          register={register}
          error={errors.active?.message}
        />
      </form>
      <div className={styles.buttons}>
        <Button
          clickAction={() => {
            closeModalForm();
          }}
          label="Cancel"
        ></Button>
        <Button
          clickAction={() => {
            submitAdd();
          }}
          label="Create"
        ></Button>
      </div>
      <SuccessModal
        show={showModalErrorSuccess}
        closeModal={() => {
          setModalErrorSuccess(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={response}
      />
    </div>
  );
};

export default AddForm;
