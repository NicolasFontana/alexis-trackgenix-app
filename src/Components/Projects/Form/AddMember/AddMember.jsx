import { useState, useEffect } from 'react';
import styles from './addMember.module.css';
import Select from '../../../Shared/Select';
import Input from '../../../Shared/Input';
import Preloader from '../../../Shared/Preloader/Preloader';
import ButtonText from '../../../Shared/Buttons/ButtonText';

const AddMember = ({ itemId, functionValue }) => {
  let edit;
  let [projectMembers, setProjectMembers] = useState([]);
  const [member, setMember] = useState('');
  const [role, setRole] = useState('');
  const [rate, setRate] = useState('');
  const [employees, setEmployees] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/employees`);
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
    try {
      // const params = new URLSearchParams(window.location.search);
      // const projectID = params.get('id');
      // setRouteID(projectID);
      const getProject = await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${itemId}`);
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
  };
  const onChangeRole = (event) => {
    setRole(event.target.value);
  };

  const OnChangeRate = (event) => {
    setRate(event.target.value);
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
    let url = `${process.env.REACT_APP_API_URL}/api/projects/${itemId}`;
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
      }
    } catch (error) {
      alert(error);
    }
    fetchData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    handleOnSubmit();
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
        <button type="submit">Submit</button>
      </form>
      {/* <ListMembers projectMembers={projectMembers} itemId={itemId} isLoading={isLoading} /> */}
      <ButtonText
        clickAction={function () {
          functionValue(false);
        }}
        label="Close"
      ></ButtonText>
    </div>
  );
};

export default AddMember;
