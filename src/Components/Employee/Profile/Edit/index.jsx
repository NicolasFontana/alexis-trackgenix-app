import React from 'react';
import { useState } from 'react';
import styles from './edit.module.css';
import { ButtonText, Input, ErrorSuccessModal } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { updateEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

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
  address: Joi.string().min(4).messages({
    'string.min': 'Invalid address, it must contain more than 4 letters'
  }),
  picture: Joi.string().min(4).messages({
    'string.min': 'Invalid picture URL, it must contain more than 4 letters'
  }),
  dni: Joi.number().integer().min(0).messages({
    'number.integer': 'Invalid number, it must be an integer',
    'number.min': 'Invalid number, it must be positive'
  }),
  dateBirth: Joi.date()
});

const EmployeeFormEdit = ({ employeeEdit, closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');

  const id = employeeEdit._id;

  const onSubmit = (data) => {
    if (
      data.firstName === employeeEdit.firstName &&
      data.lastName === employeeEdit.lastName &&
      data.phone === employeeEdit.phone &&
      data.email === employeeEdit.email &&
      data.password === employeeEdit.password &&
      data.address === employeeEdit.address &&
      data.picture === employeeEdit.picture &&
      data.dni === employeeEdit.dni &&
      data.dateBirth === employeeEdit.dateBirth
    ) {
      setResponse({ message: "There haven't been any changes", data: {}, error: true });
      setShowSuccessModal(true);
    } else {
      let body = JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        address: data.address,
        picture: data.picture,
        dni: data.dni,
        dateBirth: data.dateBirth
      });
      dispatch(updateEmployee(body, id, setResponse)).then(() => {
        setShowSuccessModal(true);
      });
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
      firstName: employeeEdit.firstName,
      lastName: employeeEdit.lastName,
      phone: employeeEdit.phone,
      email: employeeEdit.email,
      password: employeeEdit.password,
      address: employeeEdit.address,
      picture: employeeEdit.picture,
      dni: employeeEdit.dni,
      dateBirth: employeeEdit.dateBirth
    }
  });

  return (
    <div>
      <form className={styles.formBody} onSubmit={handleSubmit(onSubmit)}>
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
          label="Phone"
          type="text"
          name="phone"
          placeholder="Insert phone"
          register={register}
          error={errors.phone?.message}
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
          label="Address"
          type="text"
          name="address"
          placeholder="Insert address"
          register={register}
          error={errors.address?.message}
        />
        <Input
          label="Picture link"
          type="text"
          name="picture"
          placeholder="Insert picture link"
          register={register}
          error={errors.picture?.message}
        />
        <Input
          label="DNI"
          type="text"
          name="dni"
          placeholder="Insert DNI"
          register={register}
          error={errors.dni?.message}
        />
        <Input
          label="Date of birth"
          type="date"
          name="dateBirth"
          placeholder="Insert date of birth"
          register={register}
          error={errors.dateBirth?.message}
        />
      </form>
      <div className={styles.buttonBox}>
        <ButtonText clickAction={closeModalForm} label="Cancel"></ButtonText>
        <ButtonText clickAction={handleSubmit(onSubmit)} label="Edit"></ButtonText>
        <ErrorSuccessModal
          show={showSuccessModal}
          closeModal={() => {
            setShowSuccessModal(false);
          }}
          closeModalForm={closeModalForm}
          successResponse={response}
        />
      </div>
    </div>
  );
};

export default EmployeeFormEdit;
