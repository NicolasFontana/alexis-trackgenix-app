import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';
import { getProjectById, updateProject } from 'redux/projects/thunks';
import { Select, Input, ButtonText, ErrorSuccessModal } from 'Components/Shared';
import styles from './addMember.module.css';

const AddMember = ({ itemId, functionValue }) => {
  let edit;
  let projectId = itemId;
  let [projectMembers, setProjectMembers] = useState([]);
  const [member, setMember] = useState('');
  const [role, setRole] = useState('');
  const [rate, setRate] = useState('');
  const [edited, setEdited] = useState(false);
  const [showErrorSuccessModal, setShowErrorSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);

  useEffect(() => {
    dispatch(getEmployees());
    dispatch(getProjectById(projectId, (project) => setProjectMembers(project.members)));
  }, []);

  const onChangeMember = (event) => {
    setMember(event.target.value);
    setEdited(true);
  };
  const onChangeRole = (event) => {
    setRole(event.target.value);
    setEdited(true);
  };

  const OnChangeRate = (event) => {
    setRate(event.target.value);
    setEdited(true);
  };

  const asignMember = () => {
    projectMembers = projectMembers.filter((member) => member.employeeId !== null);
    if (member !== '') {
      for (let i = 0; i < projectMembers.length; i++) {
        if (projectMembers[i].employeeId._id) {
          projectMembers[i].employeeId = projectMembers[i].employeeId._id;
        }
        if (projectMembers[i].employeeId == member) {
          projectMembers[i].role = role;
          projectMembers[i].rate = rate;
          edit = true;
        }
      }
      if (!edit) {
        projectMembers.push({
          employeeId: member,
          role: role,
          rate: rate
        });
      }
    }
    setProjectMembers(projectMembers);
    return projectMembers;
  };

  const handleOnSubmit = async () => {
    if (member !== '' && role !== '' && rate !== '') {
      dispatch(
        updateProject(projectId, { members: asignMember() }, (alertMessage) =>
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

  const onSubmit = () => {
    edited
      ? handleOnSubmit()
      : (setEdited(false),
        setAlertMessage({ error: true, message: 'No member selected' }),
        openAlertModal());
  };
  const handleOnClick = () => {
    edited
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

  return (
    <div className={styles.divcontainer}>
      <form onSubmit={onSubmit} className={styles.container}>
        <Select
          label="Employee"
          value={member}
          onChange={onChangeMember}
          className={styles.inputs}
          title="Choose Member"
          required={true}
          data={employees.map((employee) => ({
            _id: employee._id,
            optionText: `${employee.firstName} ${employee.lastName}`
          }))}
          register={console.log}
        />
        <Select
          label="Role"
          name="role"
          value={role}
          onChange={onChangeRole}
          title="Choose Role"
          data={['TL', 'QA', 'DEV', 'PM']}
          required={true}
          register={console.log}
        />
        <Input
          label="Rate"
          type="number"
          value={rate}
          onChange={OnChangeRate}
          placeholder="Insert rate"
          required={true}
          register={console.log}
        />
      </form>
      <ButtonText
        clickAction={function () {
          onSubmit();
        }}
        label="Submit"
      ></ButtonText>
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
