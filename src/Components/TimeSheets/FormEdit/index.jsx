import { useState } from 'react';
import styles from './form.module.css';
import Select from '../../Shared/Select/index';
import ButtonText from '../../Shared/Buttons/ButtonText/index';
import ResponseModal from '../../Shared/ErrorSuccessModal/index';
import { putTimesheet } from '../../../redux/time-sheets/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'Components/Shared';
import { useForm } from 'react-hook-form';

const FormEdit = ({ closeModalEdit, timesheetItem }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const listProject = useSelector((state) => state.projects.list);
  const listTask = useSelector((state) => state.tasks.list);

  const onSubmit = (data) => {
    let userInput = {
      projectId: data.projectId,
      task: data.task,
      approved: data.approved
    };
    if (
      userInput.projectId == timesheetItem.projectId._id &&
      userInput.task == timesheetItem.Task[0].taskId._id &&
      userInput.approved == timesheetItem.approved
    ) {
      setMessage({ message: "There haven't been any changes", data: {}, error: true });
      setShowMessageModal(true);
    } else {
      dispatch(putTimesheet(userInput, timesheetItem._id, setMessage));
      setShowMessageModal(true);
    }
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
    defaultValues: {
      projectId: timesheetItem.projectId._id,
      task: timesheetItem.Task[0].taskId._id,
      approved: timesheetItem.approved
    }
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Select
        label="Projects"
        name="projectId"
        title="Choose project"
        data={listProject.map((project) => ({
          _id: project._id,
          optionText: project.name
        }))}
        register={register}
        error={errors.projectId?.message}
      />
      <Select
        label="Tasks"
        name="task"
        title="Choose task"
        data={listTask.map((task) => ({
          _id: task._id,
          optionText: task.taskName
        }))}
        register={register}
        error={errors.task?.message}
      />
      <Input
        label="Approved"
        name="approved"
        title="Approve"
        type="checkbox"
        register={register}
        error={errors.approved?.message}
      />
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
