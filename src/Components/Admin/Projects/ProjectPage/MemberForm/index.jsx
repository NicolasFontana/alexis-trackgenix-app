import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects, updateProject } from 'redux/projects/thunks';
import { Select, Input, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import styles from './memberForm.module.css';
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
    'number.unsafe': 'Rate must be a safe number',
    'number.base': 'Rate is a required field'
  })
});

const MemberForm = ({ closeModalForm, project, memberId }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  const [message, setMessage] = useState('');
  let memberToEdit = project.members.find((member) => member.employeeId._id === memberId);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, [showModalErrorSuccess]);

  const onSubmit = (data) => {
    if (memberToEdit) {
      if (data.role === memberToEdit.role && data.rate === memberToEdit.rate) {
        setMessage({ message: "There haven't been any changes", data: {}, error: true });
        setModalErrorSuccess(true);
      } else {
        dispatch(
          updateProject(
            project._id,
            {
              members: project.members.map((member) => ({
                employeeId: member.employeeId._id,
                role: member.employeeId._id === memberId ? data.role : member.role,
                rate: member.employeeId._id === memberId ? data.rate : member.rate
              }))
            },
            setMessage
          )
        ).then(() => {
          setModalErrorSuccess(true);
        });
      }
    } else {
      dispatch(
        updateProject(
          project._id,
          {
            members: project.members
              .map((member) => ({
                employeeId: member.employeeId._id,
                role: member.role,
                rate: member.rate
              }))
              .concat({
                employeeId: data.member,
                role: data.role,
                rate: data.rate
              })
          },
          setMessage
        )
      ).then(() => {
        setModalErrorSuccess(true);
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
      member: memberId
        ? `${memberToEdit.employeeId.firstName} ${memberToEdit.employeeId.lastName}`
        : '',
      role: memberId ? memberToEdit.role : '',
      rate: memberId ? memberToEdit.rate : ''
    },
    shouldFocusError: false
  });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      {memberToEdit ? (
        <Input
          label="Employee"
          type="text"
          name="member"
          placeholder={`${memberToEdit.firstName} ${memberToEdit.lastName}`}
          register={register}
          error={errors.member?.message}
          disabled
        />
      ) : (
        <Select
          label="Employee"
          title="Choose Member"
          name="member"
          data={employees.map((employee) => ({
            _id: employee._id,
            optionText: `${employee.firstName} ${employee.lastName}`
          }))}
          register={register}
          error={errors.member?.message}
        />
      )}
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
      <ButtonText
        clickAction={handleSubmit(onSubmit)}
        label={memberId ? 'Edit' : 'Add'}
      ></ButtonText>
      <ErrorSuccessModal
        show={showModalErrorSuccess}
        closeModal={() => {
          setModalErrorSuccess(false);
        }}
        closeModalForm={closeModalForm}
        successResponse={message}
      />
    </form>
  );
};

export default MemberForm;
