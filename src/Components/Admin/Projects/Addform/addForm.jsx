import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from 'redux/projects/thunks';
import { ButtonText, ErrorSuccessModal, Input, Textarea } from 'Components/Shared';
import styles from './add.form.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Z][\p{L}\p{M}]*$/u)
    .required()
    .messages({
      'string.min': 'Project name it must contain more than 3 letters',
      'string.max': 'Project name it must not contain more than 50 letters',
      'string.pattern.base':
        'Invalid project name, it must contain only letters and start with a capital letter',
      'string.empty': 'Name is a required field'
    }),
  description: Joi.string().min(4).required().messages({
    'string.min': 'Invalid description, it must contain more than 4 letters',
    'string.empty': 'Description is a required field'
  }),
  startDate: Joi.date().required().messages({ 'date.base': 'Start date is a rquired field' }),
  endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
    'date.greater': 'Invalid end date, it must be after the start date',
    'date.base': 'End date is a required field'
  }),
  clientName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Z][\p{L}\p{M}]*$/u)
    .required()
    .messages({
      'string.min': 'Client name it must contain more than 3 letters',
      'string.max': 'Client name it must not contain more than 50 letters',
      'string.pattern.base':
        'Invalid client name, it must contain only letters and start with a capital letter',
      'string.empty': 'Client name is a required field'
    }),
  active: Joi.boolean().required()
});

const AddForm = ({ closeModalForm }) => {
  const dispatch = useDispatch();
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = (data) => {
    dispatch(addProject(data, (message) => setMessage(message))).then(() => {
      setModalErrorSuccess(true);
    });
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      clientName: '',
      active: true,
      description: ''
    }
  });

  return (
    <>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <Input
            label="Project Name"
            type="text"
            name="name"
            placeholder="Insert project name"
            register={register}
            error={errors.name?.message}
          />
          <Input
            label="Client"
            type="text"
            name="clientName"
            placeholder="Insert client name"
            register={register}
            error={errors.clientName?.message}
          />
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            register={register}
            error={errors.startDate?.message}
          />
          <Input
            label="End Date"
            type="date"
            name="endDate"
            register={register}
            error={errors.endDate?.message}
          />
          <Textarea
            label="Description"
            name="description"
            placeholder="Add a description of the project"
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
          <ButtonText clickAction={handleSubmit(onSubmit)} label="Create"></ButtonText>
        </div>
        <ErrorSuccessModal
          show={showModalErrorSuccess}
          closeModal={() => {
            setModalErrorSuccess(false);
          }}
          closeModalForm={closeModalForm}
          successResponse={message}
        />
      </div>
    </>
  );
};

export default AddForm;
