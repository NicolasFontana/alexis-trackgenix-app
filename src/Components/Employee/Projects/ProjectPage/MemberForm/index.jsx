import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, updateEmployee } from 'redux/employees/thunks';
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
  })
});

const MemberForm = ({ closeModalForm, project, memberId }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list).filter(
    (employee) => !project.members.some((member) => member.employeeId._id === employee._id)
  );
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  const [response, setResponse] = useState('');
  const [responseEmployee, setResponseEmployee] = useState('');
  let memberToEdit = project.members.find((member) => member.employeeId._id === memberId);
  let pm = project?.members.find((member) => member.role === 'PM');
  let tl = project?.members.find((member) => member.role === 'TL');

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, [showModalErrorSuccess]);

  const onSubmit = (data) => {
    setResponseEmployee('');
    if (pm && data.role === 'PM' && memberId !== pm.employeeId._id) {
      setResponse({
        message: `Project Manager already defined: ${pm.employeeId.firstName} ${pm.employeeId.lastName}`,
        data: {},
        error: true
      });
      setModalErrorSuccess(true);
    } else if (tl && data.role === 'TL' && memberId !== tl.employeeId._id) {
      setResponse({
        message: `Team Leader already defined: ${tl.employeeId.firstName} ${tl.employeeId.lastName}`,
        data: {},
        error: true
      });
      setModalErrorSuccess(true);
      // Edit member
    } else if (memberToEdit) {
      if (data.role === memberToEdit.role) {
        setResponse({ message: "There haven't been any changes", data: {}, error: true });
        setModalErrorSuccess(true);
      } else {
        dispatch(
          updateProject(
            project._id,
            {
              members: project.members.map((member) => ({
                employeeId: member.employeeId._id,
                role: member.employeeId._id === memberId ? data.role : member.role,
                rate: member.rate
              }))
            },
            setResponse
          )
        ).then(() => {
          setModalErrorSuccess(true);
        });
      }
      // Add member
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
                rate: 0
              })
          },
          setResponse
        )
      )
        .then(
          dispatch(
            updateEmployee(
              JSON.stringify({
                projects: employees
                  .find((employee) => employee._id === data.member)
                  .projects.map((project) => project._id)
                  .concat(project._id)
              }),
              data.member,
              setResponseEmployee
            )
          )
        )
        .then(() => {
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
      role: memberId ? memberToEdit.role : ''
    },
    shouldFocusError: false
  });

  return !employees.length && !memberToEdit && !showModalErrorSuccess ? (
    <p className={styles.noEmployeesMessage}>There are no more employees to add</p>
  ) : (
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
        data={['TL', 'QA', 'DEV']}
        register={register}
        error={errors.role?.message}
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
        successResponse={{
          message:
            responseEmployee === ''
              ? response.message
              : `${response.message}. ${responseEmployee.message}`,
          data: response.data,
          error: response.error
        }}
      />
    </form>
  );
};

export default MemberForm;
