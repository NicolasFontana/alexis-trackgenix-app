import React from 'react';
import { useState } from 'react';
import styles from './add.module.css';
import ButtonText from '../../Shared/Buttons/ButtonText';
import Input from '../../Shared/Input';
import SuccessModal from '../../Shared/ErrorSuccessModal/index';
import { useDispatch } from 'react-redux';
import { postSuperAdmins } from '../../../redux/super-admins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]*$/)
    .messages({
      'string.min': 'Invalid name, it must contain more than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 50 letters',
      'string.pattern.base': 'Invalid name, it must contain only letters'
    })
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]*$/)
    .messages({
      'string.min': 'Invalid last name, it must contain more than 3 letters',
      'string.max': 'Invalid last name, it must not contain more than 50 letters',
      'string.pattern.base': 'Invalid last name, it must contain only letters'
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('Invalid email format')
    .required(),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .messages({
      'string.min': 'Invalid password, it must contain at least 8 characters',
      'string.pattern.base': 'Invalid password, it must contain both letters and numbers'
    })
    .required(),
  active: Joi.boolean().required()
});

const SuperAdminsFormAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');

  const submitAdd = (data) => {
    let newSuperAdmin = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      active: data.active
    });
    dispatch(postSuperAdmins(newSuperAdmin, setResponse)).then(() => setShowSuccessModal(true));
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      active: false
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.formBody} onSubmit={handleSubmit(submitAdd)}>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Insert first name"
          required={true}
          register={register}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Insert last name"
          required={true}
          register={register}
          error={errors.lastName?.message}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="Insert email"
          required={true}
          register={register}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Insert password"
          required={true}
          register={register}
          error={errors.password?.message}
        />
        <Input
          label="Active"
          name="active"
          type="checkbox"
          register={register}
          error={errors.active?.message}
        />
        <div className={styles.buttonBox}>
          <ButtonText clickAction={closeModalForm} label="Cancel" />
          <ButtonText clickAction={handleSubmit(submitAdd)} label="Create" />
        </div>
        <SuccessModal
          show={showSuccessModal}
          closeModal={() => {
            setShowSuccessModal(false);
          }}
          closeModalForm={closeModalForm}
          successResponse={response}
        />
      </form>
    </div>
  );
};

export default SuperAdminsFormAdd;
