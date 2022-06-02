import React, { useState, useEffect } from 'react';
import List from './List/List';

const App = () => {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
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

  return (
    <div>
      <List superAdmins={superAdmins} setSuperAdmins={setSuperAdmins} deleteSuperA={deleteSuperA} />
    </div>
  );
};

export default App;
