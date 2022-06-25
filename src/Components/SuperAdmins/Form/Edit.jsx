import { React, useState } from 'react';
import styles from './add.module.css';
import { ButtonText, ErrorSuccessModal, Input } from '../../Shared';
import { useDispatch } from 'react-redux';
import { putSuperAdmins } from '../../../redux/super-admins/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[\p{L}\p{M}]*$/u)
    .required()
    .messages({
      'string.min': 'Invalid name, it must contain more than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 50 letters',
      'string.pattern.base': 'Invalid name, it must contain only letters',
      'string.empty': 'First Name is a required field'
    }),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[\p{L}\p{M}]*$/u)
    .required()
    .messages({
      'string.min': 'Invalid last name, it must contain more than 3 letters',
      'string.max': 'Invalid last name, it must not contain more than 50 letters',
      'string.pattern.base': 'Invalid last name, it must contain only letters',
      'string.empty': 'Last Name is a required field'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email is a required field'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
    .required()
    .messages({
      'string.min': 'Invalid password, it must contain at least 8 characters',
      'string.pattern.base': 'Invalid password, it must contain both letters and numbers',
      'string.empty': 'Password is a required field'
    }),
  active: Joi.boolean().required()
});

const SuperAdminsFormEdit = ({ superAdminEdit, closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');

  const submitEdit = async (data) => {
    let editedSuperAdmin = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      active: data.active
    });
    if (
      data.firstName === superAdminEdit.firstName &&
      data.lastName === superAdminEdit.lastName &&
      data.email === superAdminEdit.email &&
      data.password === superAdminEdit.password &&
      data.active === superAdminEdit.active
    ) {
      setResponse({ message: "There haven't been any changes", data: {}, error: true });
      setShowSuccessModal(true);
    } else {
      dispatch(putSuperAdmins(superAdminEdit._id, editedSuperAdmin, setResponse)).then(() =>
        setShowSuccessModal(true)
      );
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: superAdminEdit.firstName,
      lastName: superAdminEdit.lastName,
      email: superAdminEdit.email,
      password: superAdminEdit.password,
      active: superAdminEdit.active
    }
  });

  return (
    <div className={styles.container}>
      <form className={styles.formBody} onSubmit={handleSubmit(submitEdit)}>
        <Input
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Insert first name"
          register={register}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Insert last name"
          register={register}
          error={errors.lastName?.message}
        />
        <Input
          label="Email"
          type="text"
          name="email"
          placeholder="Insert email"
          register={register}
          error={errors.email?.message}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Insert password"
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
          <ButtonText clickAction={handleSubmit(submitEdit)} label="Edit" />
        </div>
        <ErrorSuccessModal
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

export default SuperAdminsFormEdit;
