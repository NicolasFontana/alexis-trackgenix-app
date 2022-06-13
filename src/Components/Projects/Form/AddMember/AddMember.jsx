import { useState, useEffect } from 'react';
import styles from './addMember.module.css';
import Select from '../../../Shared/Select';
import Input from '../../../Shared/Input';
import Preloader from '../../../Shared/Preloader/Preloader';
import ButtonText from '../../../Shared/Buttons/ButtonText';
import ConfirmModal from '../../../Shared/confirmationModal/confirmModal';
import AlertModal from '../../../Shared/ErrorSuccessModal';

const AddMember = ({ itemId, functionValue }) => {
  let edit;
  let projectId = itemId;
  let [projectMembers, setProjectMembers] = useState([]);
  const [member, setMember] = useState('');
  const [role, setRole] = useState('');
  const [rate, setRate] = useState('');
  const [employees, setEmployees] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [edited, setEdited] = useState(false);
  const [showconfirmModal, setShowconfirmModal] = useState(false);
  const [showErrorSuccessModal, setShowErrorSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
    try {
      const getProject = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`);
      const projectData = await getProject.json();
      setProjectMembers(projectData.data.members);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
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
    setProjectMembers(projectMembers);
    return projectMembers;
  };

  const handleOnSubmit = async () => {
    let url = `${process.env.REACT_APP_API_URL}/api/projects/${projectId}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ members: asignMember() })
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(data.message);
      } else {
        setAlertMessage({ error: false, message: 'Member added successfully' });
      }
    } catch (error) {
      setAlertMessage(error);
    }
    openAlertModal();
    fetchData();
  };

  const onSubmit = () => {
    edited
      ? handleOnSubmit()
      : (setEdited(false), alert('No input changed. The project stayed the same'));
  };

  const handleOnClick = () => {
    edited ? openConfirmModal() : functionValue(false);
  };

  const closeConfirmModal = () => {
    setShowconfirmModal(false);
  };

  const openConfirmModal = () => {
    setShowconfirmModal(true);
  };

  const closeAlertModal = () => {
    setShowErrorSuccessModal(false);
  };

  const openAlertModal = () => {
    setShowErrorSuccessModal(true);
  };

  return isLoading ? (
    <Preloader>
      <p>Loading projects</p>
    </Preloader>
  ) : (
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
        />
        <Select
          label="Role"
          name="role"
          value={role}
          onChange={onChangeRole}
          title="Choose Role"
          data={['TL', 'QA', 'DEV', 'PM']}
          required={true}
        />
        <Input
          label="Rate"
          type="number"
          value={rate}
          onChange={OnChangeRate}
          placeholder="Insert rate"
          required={true}
        />
        <ButtonText
          clickAction={function () {
            onSubmit();
          }}
          label="Submit"
        ></ButtonText>
      </form>
      <ButtonText
        clickAction={function () {
          handleOnClick();
        }}
        label="Go Back"
      ></ButtonText>
      <AlertModal
        show={showErrorSuccessModal}
        closeModal={closeAlertModal}
        closeModalForm={function () {
          functionValue(false);
        }}
        successResponse={alertMessage}
      />
      <ConfirmModal
        isOpen={showconfirmModal}
        handleClose={closeConfirmModal}
        confirmDelete={function () {
          functionValue(false);
        }}
        title={'Unsaved changes'}
        message={'All unsaved changes will be lost. Are you sure you want to continue?'}
      />
    </div>
  );
};

export default AddMember;
