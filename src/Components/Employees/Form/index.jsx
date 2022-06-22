import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, updateEmployee } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getAllTimesheets } from 'redux/time-sheets/thunks';
import styles from './form.module.css';
import { Input, Select, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/(?:\p{L}\p{M}*)+/u)
    .required()
    .messages({
      'string.min': 'First name must contain more than 3 letters',
      'string.max': 'First name must not contain more than 50 letters',
      'string.pattern.base': 'First name must contain only letters',
      'string.empty': 'First Name is a required field'
    }),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/(?:\p{L}\p{M}*)+/u)
    .required()
    .messages({
      'string.min': 'Last name must contain more than 3 letters',
      'string.max': 'Last name must not contain more than 50 letters',
      'string.pattern.base': 'Last name must contain only letters',
      'string.empty': 'Last Name is a required field'
    }),
  phone: Joi.string().pattern(/^\d+$/).length(10).required().messages({
    'string.pattern.base': 'Phone number must contain only numbers',
    'string.length': 'Phone number must contain 10 numbers',
    'string.empty': 'Phone number is a required field'
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
      'string.min': 'Password must contain at least 8 characters',
      'string.pattern.base': 'Password must contain both letters and numbers',
      'string.empty': 'Password is a required field'
    }),
  active: Joi.string()
    .valid('Active', 'Inactive')
    .required()
    .messages({ 'any.only': 'This is a required field' }),
  isProjectManager: Joi.string()
    .valid('Yes', 'No')
    .required()
    .messages({ 'any.only': 'This is a required field' }),
  projects: Joi.string().allow('').alphanum().length(24).messages({
    'string.alphanum': 'Project id must contain both letters and numbers',
    'string.length': 'Project id must contain 24 characters'
  }),
  timeSheets: Joi.string().allow('').alphanum().length(24).messages({
    'string.alphanum': 'Timesheet id must contain both letters and numbers',
    'string.length': 'Timesheet id must contain 24 characters'
  })
});

const Form = ({ closeModalForm, edit, item }) => {
  const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [response, setResponse] = useState('');
  const projects = useSelector((state) => state.projects.list);
  const timeSheets = useSelector((state) => state.timesheets.listTimesheet);

  useEffect(() => {
    dispatch(getProjects()).then(dispatch(getAllTimesheets()));
  }, []);

  const onSubmit = (data) => {
    if (edit) {
      console.log(data);
      if (
        data.firstName === item.firstName &&
        data.lastName === item.lastName &&
        data.phone === item.phone &&
        data.email === item.email &&
        data.password === item.password &&
        data.active === (item.active === true ? 'Active' : 'Inactive') &&
        data.isProjectManager === (item.isProjectManager === true ? 'Yes' : 'No') &&
        data.projects === item.projects.map((x) => x._id).toString() &&
        data.timeSheets === item.timeSheets.map((x) => x._id).toString()
      ) {
        setResponse({ message: "There haven't been string changes", data: {}, error: true });
        setShowSuccessModal(true);
      } else {
        dispatch(updateEmployee(data, item._id, setResponse)).then(() => {
          setShowSuccessModal(true);
        });
      }
    } else {
      dispatch(createEmployee(data, setResponse)).then(() => {
        setShowSuccessModal(true);
      });
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
      firstName: edit ? item.firstName : '',
      lastName: edit ? item.lastName : '',
      phone: edit ? item.phone : '',
      email: edit ? item.email : '',
      password: edit ? item.password : '',
      active: edit ? (item.active ? 'Active' : 'Inactive') : '',
      isProjectManager: edit ? (item.isProjectManager ? 'Yes' : 'No') : '',
      projects: edit ? (item.projects[0] ? item.projects[0]._id : '') : '',
      timeSheets: edit ? (item.timeSheets[0] ? item.timeSheets[0]?._id : '') : ''
    }
  });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
      <Select
        label="Active?"
        name="active"
        title="Define condition"
        data={['Active', 'Inactive']}
        register={register}
        error={errors.active?.message}
      />
      <Select
        label="Is a Project Manager?"
        name="isProjectManager"
        title="Define PM condition"
        data={['Yes', 'No']}
        register={register}
        error={errors.isProjectManager?.message}
      />
      <Select
        label="Timesheets"
        name="timeSheets"
        title="Choose timesheet"
        data={timeSheets.map((timesheet) => ({
          _id: timesheet._id,
          optionText: timesheet._id
        }))}
        register={register}
        error={errors.timeSheets?.message}
      />
      <Select
        label="Projects"
        name="projects"
        title="Choose Project"
        data={projects.map((project) => ({
          _id: project._id,
          optionText: project.name
        }))}
        register={register}
        error={errors.projects?.message}
      />
      <ButtonText clickAction={handleSubmit(onSubmit)} label={edit ? 'Edit' : 'Create'} />
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

export default Form;
