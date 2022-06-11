import { useState, useEffect } from 'react';
import styles from './addMember.module.css';
import Select from '../../../Shared/Select';
import Input from '../../../Shared/Input';
import Preloader from '../../../Shared/Preloader/Preloader';
import ButtonText from '../../../Shared/Buttons/ButtonText';

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

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
    try {
      const getProject = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${projectId}`);
      const projectData = await getProject.json();
      setProjectMembers(projectData.data.members);
    } catch (error) {
      console.error(error);
      alert(error);
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
        alert(data.message);
        functionValue(false);
      }
    } catch (error) {
      alert(error);
    }
    fetchData();
  };

  const onSubmit = () => {
    console.log(edited);
    edited
      ? handleOnSubmit()
      : (setEdited(false), alert('No input changed. The project stayed the same'));
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
          functionValue(false);
        }}
        label="Go Back"
      ></ButtonText>
    </div>
  );
};

export default AddMember;
