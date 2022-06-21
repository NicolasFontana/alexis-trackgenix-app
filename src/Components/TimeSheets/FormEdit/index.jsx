import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Select from '../../Shared/Select/index';
import ButtonText from '../../Shared/Buttons/ButtonText/index';
import ResponseModal from '../../Shared/ErrorSuccessModal/index';
import { putTimesheet } from '../../../redux/time-sheets/thunks';
import { useDispatch } from 'react-redux';
import * as Joi from 'joi';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

const timesheetValidation = Joi.object({
  projectId: Joi.string()
    .alphanum()
    .length(24)
    .messages({
      'string.alphanum': 'Invalid project id, it must contain both letters and numbers',
      'string.length': 'Invalid project id, it must contain 24 characters'
    })
    .required(),
  task: Joi.string()
    .alphanum()
    .length(24)
    .messages({
      'string.alphanum': 'Invalid task id, it must contain both letters and numbers',
      'string.length': 'Invalid task id, it must contain 24 characters'
    })
    .required(),
  approved: Joi.boolean().required()
});

const FormEdit = ({ closeModalEdit, timesheetItem }) => {
  const dispatch = useDispatch();
  const [listTask, setListTask] = useState([]);
  const [listProject, setListProject] = useState([]);
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [userInput, setUserInput] = useState({
    projectId: timesheetItem.projectId._id,
    task: timesheetItem.Task[0].taskId._id,
    approved: timesheetItem.approved
  });

  const fetchTask = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
      const data = await response.json();
      setListTask(...listTask, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
      const data = await response.json();
      setListProject(...listProject, data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTask();
    fetchProject();
  }, []);

  const onSubmit = () => {
    dispatch(putTimesheet(userInput, timesheetItem._id, setMessage));
    setShowMessageModal(true);
  };

  const onChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const onChangeApproved = (e) => {
    setUserInput({ ...userInput, approved: e.target.value == 'true' ? true : false });
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(timesheetValidation),
    defaultValues: {
      projectId: '',
      task: '',
      approved: false
    }
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Projects"
        name="projectId"
        value={userInput.projectId}
        onChange={onChange}
        title="Choose project"
        data={listProject.map((project) => ({
          _id: project._id,
          optionText: project.name
        }))}
        required={true}
        register={register}
        error={errors.projectId?.message}
      />
      <Select
        label="Tasks"
        name="task"
        value={userInput.task}
        onChange={onChange}
        title="Choose task"
        data={listTask.map((task) => ({
          _id: task._id,
          optionText: task.taskName
        }))}
        required={true}
        register={register}
        error={errors.task?.message}
      />
      <Select
        label="Approved"
        name="approved"
        value={userInput.approved}
        onChange={onChangeApproved}
        title="Approve"
        data={['true', 'false']}
        required={true}
        register={register}
        error={errors.approved?.message}
      />
      <ButtonText
        clickAction={() => {
          closeModalEdit();
        }}
        label="Cancel"
      >
        Cancel
      </ButtonText>
      <ButtonText clickAction={handleSubmit(onSubmit)} label="Edit" />
      <ResponseModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeModalEdit}
        successResponse={message}
      />
    </form>
  );
};

export default FormEdit;
