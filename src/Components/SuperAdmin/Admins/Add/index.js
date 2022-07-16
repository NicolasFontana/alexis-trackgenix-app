import { joiResolver } from '@hookform/resolvers/joi';
import { ButtonText, ErrorSuccessModal, Input } from 'Components/Shared';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addAdmin } from 'redux/admins/thunks';
import styles from './add.module.css';

const adminSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[\p{L}\p{M}]*$/u)
    .required()
    .messages({
      'string.min': 'Invalid name, it must contain more than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 50 letters',
      'string.pattern.base': 'Invalid name, it must contain only letters',
      'string.empty': 'First name is a required field'
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
      'string.empty': 'Last name is a required field'
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
    })
});

const AdminsAdd = ({ closeModalForm }) => {
  const dispatch = useDispatch();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');

  const onSubmit = (data) => {
    let newAdmin = JSON.stringify({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    });
    dispatch(addAdmin(newAdmin, setResponse)).then(() => {
      setShowSuccessModal(true);
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(adminSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    shouldFocusError: false
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="First Name"
        type="text"
        name="firstName"
        placeholder="Insert admin first name"
        register={register}
        error={errors.firstName?.message}
      />
      <Input
        label="Last Name"
        type="text"
        name="lastName"
        placeholder="Insert admin last name"
        register={register}
        error={errors.lastName?.message}
      />
      <Input
        label="Email"
        type="email"
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
      <div className={styles.buttonBox}>
        <ButtonText clickAction={handleSubmit(onSubmit)} label="Create"></ButtonText>
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
  );
};

export default AdminsAdd;
