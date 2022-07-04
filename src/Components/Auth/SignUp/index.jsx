import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import { createEmployee } from 'redux/employees/thunks';
import { Input, ButtonText, ErrorSuccessModal, Preloader } from 'Components/Shared';
import styles from './signup.module.css';

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-zÀ-ú\s]*$/)
    .required()
    .messages({
      'string.min': 'First name must contain more than 3 letters',
      'string.max': 'First name must not contain more than 50 letters',
      'string.pattern.base': 'First name must contain only letters',
      'string.empty': 'First name is a required field'
    }),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-zÀ-ú\s]*$/)
    .required()
    .messages({
      'string.min': 'Last name must contain more than 3 letters',
      'string.max': 'Last name must not contain more than 50 letters',
      'string.pattern.base': 'Last name must contain only letters',
      'string.empty': 'Last name is a required field'
    }),
  phone: Joi.string().pattern(/^\d+$/).length(10).required().messages({
    'string.pattern.base': 'Phone number must contain only numbers',
    'string.length': 'Phone number must contain 10 numbers',
    'string.empty': 'Phone number is a required field'
  }),
  email: Joi.string()
    .pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid email format',
      'string.empty': 'Email is a required field'
    }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
    .required()
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain both letters and numbers',
      'string.empty': 'Password is a required field'
    }),
  repeatPassword: Joi.string().equal(Joi.ref('password')).messages({
    'any.only': "Passwords don't match"
  }),
  active: Joi.boolean().required().messages({ 'any.only': 'This is a required field' }),
  isProjectManager: Joi.boolean().required().messages({ 'any.only': 'This is a required field' }),
  projects: Joi.string().allow('').alphanum().length(24).messages({
    'string.alphanum': 'Project id must contain both letters and numbers',
    'string.length': 'Project id must contain 24 characters'
  }),
  timeSheets: Joi.string().allow('').alphanum().length(24).messages({
    'string.alphanum': 'Timesheet id must contain both letters and numbers',
    'string.length': 'Timesheet id must contain 24 characters'
  })
});

const Form = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');

  const closeModal = () => {
    setShowSuccessModal(false);
    document.body.style.overflow = 'unset';
    history.push('/');
  };

  const onSubmit = (data) => {
    return dispatch(createEmployee(data, setResponse)).then(() => {
      document.body.style.overflow = 'hidden';
      setShowSuccessModal(true);
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      repeatPassword: '',
      active: true,
      isProjectManager: false,
      projects: '',
      timeSheets: ''
    }
  });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <Input
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Juan"
          register={register}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Perez"
          register={register}
          error={errors.lastName?.message}
        />
        <Input
          label="Phone"
          name="phone"
          type="text"
          placeholder="123456789"
          register={register}
          error={errors.phone?.message}
        />
        <Input
          label="Email"
          register={register}
          name="email"
          type="text"
          placeholder="juanperez@gmail.com"
          error={errors.email?.message}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="********"
          register={register}
          error={errors.password?.message}
        />
        <Input
          label="Repeat password"
          name="repeatPassword"
          type="password"
          placeholder="********"
          register={register}
          error={errors.repeatPassword?.message}
        />
      </div>
      <ButtonText clickAction={handleSubmit(onSubmit)} label={'Create'} />
      {isLoading ? (
        <Preloader />
      ) : (
        <ErrorSuccessModal
          show={showSuccessModal}
          closeModal={() => {
            setShowSuccessModal(false);
            document.body.style.overflow = 'unset';
          }}
          closeModalForm={closeModal}
          successResponse={response}
        />
      )}
    </form>
  );
};

export default Form;
