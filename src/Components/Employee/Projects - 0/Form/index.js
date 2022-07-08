import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProjectById, updateProject } from 'redux/projects/thunks';
import { ButtonText, Input, Textarea, ErrorSuccessModal } from 'Components/Shared';
import styles from './form.module.css';
import ListMembers from './ListMembers/ListMembers';
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
      'string.min': 'Project name must contain more than 3 letters',
      'string.max': 'Project name must not contain more than 50 letters',
      'string.pattern.base':
        'Project name must contain only letters and start with a capital letter',
      'string.empty': 'Name is a required field'
    }),
  description: Joi.string().min(4).required().messages({
    'string.min': 'Description must contain more than 4 letters',
    'string.empty': 'Description is a required field'
  }),
  startDate: Joi.date().required().messages({ 'date.base': 'Start date is a required field' }),
  endDate: Joi.date().greater(Joi.ref('startDate')).required().messages({
    'date.greater': 'End Date must be after the start date',
    'date.base': 'End date is a required field'
  }),
  clientName: Joi.string()
    .min(3)
    .max(50)
    .pattern(/^[A-Z][\p{L}\p{M}]*$/u)
    .required()
    .messages({
      'string.min': 'Client name must contain more than 3 letters',
      'string.max': 'Client name must not contain more than 50 letters',
      'string.pattern.base':
        'Client name must contain only letters and start with a capital letter',
      'string.empty': 'Client name is a required field'
    }),
  active: Joi.boolean().required()
});

const ProjectForm = ({ project, itemId, functionValue, closeModalForm }) => {
  const [showErrorSuccessModal, setShowErrorSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectById(itemId));
  }, []);

  const handleOnSubmit = (data) => {
    if (
      data.name === project.name &&
      data.startDate.toString() == new Date(project.startDate) &&
      data.endDate.toString() == new Date(project.endDate) &&
      data.clientName === project.clientName &&
      data.active === project.active &&
      data.description === project.description
    ) {
      setAlertMessage({ message: "There hasn't been any changes", data: {}, error: true });
      setShowErrorSuccessModal(true);
    } else {
      dispatch(updateProject(itemId, data, (alertMessage) => setAlertMessage(alertMessage))).then(
        () => openAlertModal()
      );
    }
  };

  const closeAlertModal = () => {
    setShowErrorSuccessModal(false);
  };

  const openAlertModal = () => {
    setShowErrorSuccessModal(true);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      name: project.name,
      startDate: project.startDate.slice(0, 10),
      endDate: project.endDate.slice(0, 10),
      clientName: project.clientName,
      active: project.active,
      description: project.description
    }
  });

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(handleOnSubmit)}>
        <div className={styles.maincontainer}>
          <div className={styles.divcontainer}>
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
              label="Active"
              name="active"
              type="checkbox"
              register={register}
              error={errors.active?.message}
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
          </div>
          <div className={styles.larger}>
            <Textarea
              label="Description"
              name="description"
              placeholder="Add a description of the project"
              register={register}
              error={errors.description?.message}
            />
            <div>
              <ListMembers project={project} edited={isDirty} functionValue={functionValue} />
            </div>
          </div>
        </div>
      </form>
      <div>
        <ButtonText clickAction={handleSubmit(handleOnSubmit)} label="Edit"></ButtonText>
        <ErrorSuccessModal
          show={showErrorSuccessModal}
          closeModal={closeAlertModal}
          closeModalForm={closeModalForm}
          successResponse={alertMessage}
        />
      </div>
    </>
  );
};
export default ProjectForm;
