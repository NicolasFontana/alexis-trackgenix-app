import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import List from './List/List';
import Preloader from '../Shared/Preloader/Preloader';
import styles from './super-admins.module.css';
import Button from '../Shared/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const plus = <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>;

  const history = useHistory();

  const routeChange = () => {
    let path = `/super-admins/add`;
    history.push(path);
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperA = async (_id) => {
    if (confirm(`WARNING!\n Are you sure you want to delete this super admin?`)) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${_id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        alert(`${data.message}\nID: ${_id}`);
        setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== _id)]);
      } catch (error) {
        alert(`Error\n${error}`);
        console.error(error);
      }
    }
  };

  return loading ? (
    <Preloader>
      <p>Loading super admins</p>
    </Preloader>
  ) : (
    <div className={styles.container}>
      <List superAdmins={superAdmins} setSuperAdmins={setSuperAdmins} deleteSuperA={deleteSuperA} />
      <Button clickAction={routeChange} buttonText={plus} className={styles.buttonAdd}></Button>
    </div>
  );
};

export default App;
