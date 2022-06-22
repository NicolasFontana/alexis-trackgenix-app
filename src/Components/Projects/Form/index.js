import React from 'react';
import { useState } from 'react';
import styles from './form.module.css';
import Button from '../../Shared/Buttons/ButtonText';
import Textarea from '../../Shared/Textarea/index';
import Input from '../../Shared/Input';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';
import { useDispatch } from 'react-redux';
import { updateProject } from '../../../redux/projects/thunks';
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

const projectsFormEdit = ({ projectEdit, closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');

  const submitEdit = async (data) => {
    let editedSuperAdmin = JSON.stringify({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      clientName: data.clientName,
      active: data.active,
      description: data.description
    });
    if (
      data.name === projectEdit.name &&
      data.startDate === projectEdit.startDate &&
      data.endDate === projectEdit.endDate &&
      data.clientName === projectEdit.clientName &&
      data.active === projectEdit.active &&
      data.description === projectEdit.description
    ) {
      setResponse({ message: "There haven't been any changes", data: {}, error: true });
      setShowSuccessModal(true);
    } else {
      dispatch(updateProject(projectEdit._id, editedSuperAdmin, setResponse)).then(() =>
        setShowSuccessModal(true)
      );
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      name: projectEdit.name,
      startDate: projectEdit.startDate,
      endDate: projectEdit.endDate,
      clientName: projectEdit.clientName,
      active: projectEdit.active,
      description: projectEdit.description
    }
  });

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit(submitEdit)}>
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
            submitEdit();
          }}
          label="Edit"
        ></Button>
      </div>
      <SuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={response}
      />
    </div>
  );
};

export default projectsFormEdit;
