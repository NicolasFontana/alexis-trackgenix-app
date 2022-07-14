import { joiResolver } from '@hookform/resolvers/joi';
import { ButtonText, ErrorSuccessModal, Input, Select } from 'Components/Shared';
import Joi from 'joi';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateProject } from 'redux/projects/thunks';
import styles from './editform.module.css';

const employeePageSchema = Joi.object({
  role: Joi.string().min(2).valid('PM', 'TL', 'QA', 'DEV').max(3).required().messages({
    'string.min': 'Invalid status, it must be one of the following: PM, TL, QA, DEV',
    'any.only': 'Invalid status, it must be one of the following: PM, TL, QA, DEV',
    'string.empty': 'Status is a required field'
  }),
  rate: Joi.number().min(1).max(999999).required().messages({
    'string.min': 'Invalid number, it must be positive',
    'string.max': 'Invalid number, it exceeds the number of posible rate',
    'string.pattern.base': 'Invalid, it must contain only interger numbers',
    'string.empty': 'Rate is a required field'
  })
});

const EditForm = ({ project, employeeData, closeModalForm }) => {
  const dispatch = useDispatch();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    if (data.role === employeeData.role && data.rate === employeeData.rate) {
      setMessage({ message: "There hasn't been any changes", data: {}, error: true });
      setShowMessageModal(true);
    } else {
      project.members.forEach((member) => {
        if (member.employeeId._id === employeeData._id) {
          member.role = employeeData.role;
          member.rate = employeeData.rate;
        }
      });
      dispatch(updateProject(project._id, project, setMessage)).then(() => {
        setShowMessageModal(true);
      });
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeePageSchema),
    defaultValues: {
      role: employeeData.role,
      rate: employeeData.rate
    }
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Role"
        name="role"
        title="Choose Role"
        data={['PM', 'TL', 'QA', 'DEV']}
        register={register}
        error={errors.role?.message}
      />
      <Input
        label="Rate"
        type="text"
        name="rate"
        placeholder="Insert Rate"
        register={register}
        error={errors.rate?.message}
      />
      <ButtonText clickAction={closeModalForm} label="Cancel"></ButtonText>
      <ButtonText clickAction={handleSubmit(onSubmit)} label="Submit"></ButtonText>
      <ErrorSuccessModal
        show={showMessageModal}
        closeModal={() => {
          setShowMessageModal(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={message}
      />
    </form>
  );
};

export default EditForm;
