import { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { createEmployee, updateEmployee } from 'redux/employees/thunks';
import styles from './form.module.css';
import { Input, Select, ButtonText, ErrorSuccessModal, Textarea } from 'Components/Shared';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      'string.min': 'It must contain more than 3 letters',
      'string.max': 'It must not contain more than 50 letters',
      'string.pattern.base': 'It must contain only letters',
      'string.empty': 'First Name is required'
    }),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[a-zA-Z\s]*$/)
    .required()
    .messages({
      'string.min': 'It must contain more than 3 letters',
      'string.max': 'It must not contain more than 50 letters',
      'string.pattern.base': 'It must contain only letters',
      'string.empty': 'Last Name is a required field'
    }),
  phone: Joi.string().pattern(/^\d+$/).length(10).required().messages({
    'string.pattern.base': 'It must contain only numbers',
    'string.length': 'It must contain 10 numbers',
    'string.empty': 'Phone number is a required field'
  }),
  email: Joi.string().required().messages({
    // 'string.email': 'invalid email format',
    'string.empty': 'Email is a required field'
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*?[a-zA-Z])(?=.*?[0-9])(?!.*[^a-zA-Z0-9])/)
    .required()
    .messages({
      'string.min': 'It must contain at least 8 characters',
      'string.pattern.base': 'It must contain both letters and numbers',
      'string.empty': 'Password is a required field'
    }),
  active: Joi.boolean().required(),
  isProjectManager: Joi.string().required().messages({ 'string.empty': 'This field is required' }),
  projects: Joi.array().items(
    Joi.string().alphanum().length(24).messages({
      'string.alphanum': 'Invalid project id, it must contain both letters and numbers',
      'string.length': 'Invalid project id, it must contain 24 characters'
    })
  ),
  timeSheets: Joi.array().items(
    Joi.string().alphanum().length(24).messages({
      'string.alphanum': 'Invalid time sheet id, it must contain both letters and numbers',
      'string.length': 'Invalid time sheet id, it must contain 24 characters'
    })
  )
});

const Form = ({ closeModalForm, edit, item }) => {
  // const dispatch = useDispatch();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  // const [response, setResponse] = useState('');
  // const [userInput, setUserInput] = useState({
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  //   password: '',
  //   active: '',
  //   isProjectManager: '',
  //   projects: [],
  //   timeSheets: []
  // });

  useEffect(() => {
    // if (edit && item._id) {
    //   setUserInput({
    //     firstName: item.firstName,
    //     lastName: item.lastName,
    //     phone: item.phone,
    //     email: item.email,
    //     password: item.password,
    //     active: item.active === true ? 'Active' : 'Inactive',
    //     isProjectManager: item.isProjectManager === true ? 'Yes' : 'No',
    //     projects: item.projects.map((x) => x._id),
    //     timeSheets: item.timeSheets.map((x) => x._id)
    //   });
    // }
  }, []);

  const onSubmit = (data) => {
    if (edit) {
      (data.isProjectManager = data.isProjectManager == 'Yes' ? true : false), console.log(data);
    }
    //   if (
    //     userInput.firstName === item.firstName &&
    //     userInput.lastName === item.lastName &&
    //     userInput.phone === item.phone &&
    //     userInput.email === item.email &&
    //     userInput.password === item.password &&
    //     userInput.active === (item.active === true ? 'Active' : 'Inactive') &&
    //     userInput.isProjectManager === (item.isProjectManager === true ? 'Yes' : 'No') &&
    //     userInput.projects.toString() === item.projects.map((x) => x._id).toString() &&
    //     userInput.timeSheets.toString() === item.timeSheets.map((x) => x._id).toString()
    //   ) {
    //     setResponse({ message: "There haven't been string changes", data: {}, error: true });
    //     setShowSuccessModal(true);
    //   } else {
    //     dispatch(updateEmployee(userInput, item._id, setResponse)).then(() => {
    //       setShowSuccessModal(true);
    //     });
    //   }
    // } else {
    //   dispatch(createEmployee(userInput, setResponse)).then(() => {
    //     setShowSuccessModal(true);
    //   });
    // }
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
      active: edit ? item.active : true,
      isProjectManager: '',
      projects: edit ? item.projects.map((x) => x._id) : '',
      timeSheets: edit ? item.timeSheets.map((x) => x._id) : ''
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
        // onChange={onChange}
        error={errors.firstName?.message}
      />
      <Textarea
        label="Projects (separate IDs with a comma)"
        name="projects"
        // value={userInput.projects}
        // onChange={onChange}
        register={register}
        error={errors.projects?.message}
      />
      <Input
        label="Last Name"
        name="lastName"
        type="text"
        // value={userInput.lastName}
        // onChange={onChange}
        placeholder="Perez"
        register={register}
        error={errors.lastName?.message}
      />
      <Input
        label="Phone"
        name="phone"
        type="text"
        // value={userInput.phone}
        // onChange={onChange}
        placeholder="123456789"
        register={register}
        error={errors.phone?.message}
      />
      <Input
        label="Email"
        register={register}
        name="email"
        type="text"
        // value={userInput.email}
        // onChange={onChange}
        placeholder="juanperez@gmail.com"
        error={errors.email?.message}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        // value={userInput.password}
        // onChange={onChange}
        placeholder="********"
        register={register}
        error={errors.password?.message}
      />
      <Input
        label="Active"
        name="active"
        type="checkbox"
        // checked={userInput.active}
        register={register}
      />
      <Select
        label="Is a Project Manager?"
        name="isProjectManager"
        // value={userInput.isProjectManager}
        // onChange={onChange}
        title="Define PM condition"
        data={['Yes', 'No']}
        register={register}
        error={errors.isProjectManager?.message}
      />
      <Input
        label="Timesheets (separate IDs with a comma)"
        name="timeSheets"
        type="text"
        // value={userInput.timeSheets}
        // onChange={onChange}
        placeholder=""
        register={register}
        error={errors.timeSheets?.message}
      />
      <ButtonText clickAction={handleSubmit(onSubmit)} label={edit ? 'Edit' : 'Create'} />
      <ErrorSuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={closeModalForm}
        // successResponse={response}
      />
    </form>
  );
};

export default Form;
