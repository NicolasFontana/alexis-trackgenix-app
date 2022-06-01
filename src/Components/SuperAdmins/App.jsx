import React, { useState, useEffect } from 'react';
import List from './List/List';

const App = () => {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperA = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/super-admins/${_id}`, {
        method: 'DELETE'
      });
      console.log('response', response);
      confirm(`WARNING!\n Are you sure you want to delete this super admin?`);
    } catch (error) {
      alert(`Error\n${error}`);
      console.error(error);
    }
    setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <div>
      <List superAdmins={superAdmins} setSuperAdmins={setSuperAdmins} deleteSuperA={deleteSuperA} />
    </div>
  );
};

export default App;
