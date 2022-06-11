import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import List from './List/List';
import Preloader from '../Shared/Preloader/Preloader';
import styles from './super-admins.module.css';
import ButtonAdd from '../Shared/Buttons/ButtonAdd';

const App = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const routeChange = () => {
    let path = `/super-admins/add`;
    history.push(path);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        setSuperAdmins(response.data);
        setLoading(false);
      });
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
      <ButtonAdd clickAction={routeChange}></ButtonAdd>
    </div>
  );
};

export default App;
