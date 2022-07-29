import React from 'react';
import { useState } from 'react';
import styles from './edit.module.css';
import { ButtonText, Input, ErrorSuccessModal } from 'Components/Shared';
import { useDispatch } from 'react-redux';
import { updateEmployee } from 'redux/employees/thunks';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';
import firebaseApp from 'helper/firebase';

const now = Date.now();
const cutoffDate = new Date(now - 1000 * 60 * 60 * 24 * 365 * 18);

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
    .allow('')
    .messages({
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain both letters and numbers',
      'string.empty': 'Password is a required field'
    }),
  address: Joi.string().allow('').min(4).messages({
    'string.min': 'Invalid address, it must contain more than 4 letters'
  }),
  picture: Joi.string().allow('').min(4).messages({
    'string.min': 'Invalid picture URL, it must contain more than 4 letters'
  }),
  profilePicture: Joi.object(),
  dni: Joi.number().allow('', null).integer().min(20000000).max(100000000).messages({
    'number.integer': 'Invalid number, it must be an integer',
    'number.min': 'Invalid number, it must be a valid DNI(Between 20000000 and 100000000)',
    'number.max': 'Invalid number, it must be a valid DNI(Between 20000000 and 100000000)'
  }),
  dateBirth: Joi.date().allow('', null).max(cutoffDate).messages({
    'date.max': 'Invalid date, it must be older than 18 years'
  })
});

const EmployeeFormEdit = ({ employeeEdit, closeModalForm }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const id = employeeEdit._id;
  let body;

  const onSubmit = async (data) => {
    if (data.profilePicture.length !== 0) {
      if (!/\.(jpe?g|png)$/i.test(data.profilePicture[0].name)) {
        setResponse({
          message: 'The file type must be jpeg, jpg or png. Please select a valid file',
          data: {},
          error: true
        });
        setShowSuccessModal(true);
        return null;
      }
    }
    if (
      data.firstName === employeeEdit.firstName &&
      data.lastName === employeeEdit.lastName &&
      data.phone === employeeEdit.phone &&
      data.email === employeeEdit.email &&
      data.password === '' &&
      data.address === employeeEdit.address &&
      data.profilePicture.length === 0 &&
      data.dni === employeeEdit.dni &&
      (data.dateBirth?.toString() == new Date(employeeEdit.dateBirth) || data.dateBirth === null)
    ) {
      setResponse({ message: "There haven't been any changes", data: {}, error: true });
      setShowSuccessModal(true);
    } else {
      let enlaceUrl;
      if (data.profilePicture.length !== 0) {
        const storageRef = firebaseApp.storage().ref();
        const pathFile = storageRef.child(`employees/${employeeEdit._id}/pictureProfile`);
        await pathFile.put(data.profilePicture[0]);
        enlaceUrl = await pathFile.getDownloadURL();
      }
      if (data.password === '') {
        body = JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          address: data.address,
          picture: enlaceUrl ? enlaceUrl : data.picture,
          dni: data.dni,
          dateBirth: data.dateBirth
        });
      } else {
        body = JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          password: data.password,
          address: data.address,
          picture: enlaceUrl ? enlaceUrl : data.picture,
          dni: data.dni,
          dateBirth: data.dateBirth
        });
      }
      await dispatch(updateEmployee(body, id, setResponse)).then(() => {
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
      password: '',
      address: employeeEdit.address,
      picture: employeeEdit.picture,
      dni: employeeEdit.dni,
      dateBirth: employeeEdit.dateBirth ? employeeEdit.dateBirth.slice(0, 10) : null
    },
    shouldFocusError: false
  });

  return (
    <div>
      <form className={styles.formBody} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.upperFields}>
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
          <Input
            label="Address"
            type="text"
            name="address"
            placeholder="Insert address"
            register={register}
            error={errors.address?.message}
          />
          <Input
            label="Phone"
            type="text"
            name="phone"
            placeholder="Insert phone"
            register={register}
            error={errors.phone?.message}
          />
        </div>
        <div className={styles.lowerFields}>
          <Input
            label="Picture link"
            type="file"
            name="profilePicture"
            placeholder="Insert picture link"
            register={register}
            error={errors.profilePicture?.message}
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
        </div>
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
