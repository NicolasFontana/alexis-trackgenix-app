import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import { getProjectById, updateProject } from 'redux/projects/thunks';
import { Select, Input, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import styles from './addMember.module.css';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import * as Joi from 'joi';

const schema = Joi.object({
  member: Joi.string().required().messages({
    'string.empty': 'Employee is a required field'
  }),
  role: Joi.string().required().messages({
    'string.empty': 'Role is a required field'
  }),
  rate: Joi.number().min(0).max(999999).required().messages({
    'number.min': 'Rate must be positive',
    'number.max': 'Rate must be between 0 and 999999',
    'number.base': 'Rate is a required field'
  })
});

const AddMember = ({ itemId, functionValue }) => {
  let edit;
  let projectId = itemId;
  let [projectMembers, setProjectMembers] = useState([]);
  const [showErrorSuccessModal, setShowErrorSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjectById(projectId, (project) => setProjectMembers(project.members)));
  }, []);

  const asignMember = (data) => {
    projectMembers = projectMembers.filter((member) => member.employeeId !== null);
    if (data.member !== '') {
      for (let i = 0; i < projectMembers.length; i++) {
        if (projectMembers[i].employeeId._id) {
          projectMembers[i].employeeId = projectMembers[i].employeeId._id;
        }
        if (projectMembers[i].employeeId == data.member) {
          projectMembers[i].role = data.role;
          projectMembers[i].rate = data.rate;
          edit = true;
        }
      }
      if (!edit) {
        projectMembers.push({
          employeeId: data.member,
          role: data.role,
          rate: data.rate
        });
      }
    }
    setProjectMembers(projectMembers);
    return projectMembers;
  };

  const handleOnSubmit = (data) => {
    if (data.member !== '' && data.role !== '' && data.rate !== '') {
      dispatch(
        updateProject(projectId, { members: asignMember(data) }, (alertMessage) =>
          setAlertMessage({
            error: alertMessage.error,
            message: alertMessage.error
              ? alertMessage.message
              : edit
              ? 'Team members edited successfully'
              : 'Team members added successfully'
          })
        )
      ).then(() => openAlertModal());
    } else {
      setAlertMessage({ error: true, message: 'Please complete all the fields' });
      openAlertModal();
    }
  };

  const handleOnClick = () => {
    isDirty
      ? confirm('All unsaved changes will be lost. Are you sure you want to continue?')
        ? functionValue(false)
        : null
      : functionValue(false);
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
    mode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      member: '',
      role: ''
    }
  });

  return (
    <div className={styles.divcontainer}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <Select
          label="Employee"
          className={styles.inputs}
          title="Choose Member"
          name="member"
          data={employees.map((employee) => ({
            _id: employee._id,
            optionText: `${employee.firstName} ${employee.lastName}`
          }))}
          register={register}
          error={errors.member?.message}
        />
        <Select
          label="Role"
          name="role"
          title="Choose Role"
          data={['TL', 'QA', 'DEV', 'PM']}
          register={register}
          error={errors.role?.message}
        />
        <Input
          label="Rate"
          type="number"
          name="rate"
          placeholder="Insert rate"
          register={register}
          error={errors.rate?.message}
        />
      </form>
      <ButtonText clickAction={handleSubmit(handleOnSubmit)} label="Submit"></ButtonText>
      <ButtonText
        clickAction={function () {
          handleOnClick();
        }}
        label="Go Back"
      ></ButtonText>
      <ErrorSuccessModal
        show={showErrorSuccessModal}
        closeModal={closeAlertModal}
        closeModalForm={function () {
          functionValue(false);
        }}
        successResponse={alertMessage}
      />
    </div>
  );
};

export default AddMember;
