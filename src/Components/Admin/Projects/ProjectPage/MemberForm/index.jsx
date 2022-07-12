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

const MemberForm = ({ closeModalForm, project, edit }) => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const isLoading = useSelector((state) => state.projects.isLoading);
  const [showModalErrorSuccess, setModalErrorSuccess] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjects());
  }, [!isLoading]);

  const onSubmit = (data) => {
    // if (edit) {
    //   if (
    //     data.firstName === item.firstName &&
    //     data.lastName === item.lastName &&
    //     data.phone === item.phone &&
    //     data.email === item.email &&
    //     data.password === item.password &&
    //     data.active === item.active &&
    //     data.isProjectManager === item.isProjectManager &&
    //     data.projects === item.projects.map((x) => x._id).toString() &&
    //     data.timeSheets === item.timeSheets.map((x) => x._id).toString()
    //   ) {
    //     setResponse({ message: "There haven't been any changes", data: {}, error: true });
    //     setShowSuccessModal(true);
    //   } else {
    //     let body = JSON.stringify({
    //       firstName: data.firstName,
    //       lastName: data.lastName,
    //       phone: data.phone,
    //       email: data.email,
    //       password: data.password,
    //       active: data.active,
    //       isProjectManager: data.isProjectManager,
    //       projects:
    //         data.projects.length === 0
    //           ? []
    //           : data.projects.toString().replace(/\s+/g, '').split(','),
    //       timeSheets:
    //         data.timeSheets.length === 0
    //           ? []
    //           : data.timeSheets.toString().replace(/\s+/g, '').split(',')
    //     });
    //     dispatch(updateEmployee(body, item._id, setResponse)).then(() => {
    //       setShowSuccessModal(true);
    //     });
    //   }
    // } else {
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
    // }
  };

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(schema),
    defaultValues: {
      member: '',
      role: ''
    },
    shouldFocusError: false
  });

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
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
      <ButtonText clickAction={handleSubmit(onSubmit)} label={edit ? 'Edit' : 'Add'}></ButtonText>
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
