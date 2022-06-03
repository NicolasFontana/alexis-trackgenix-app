import React, { useState, useEffect } from 'react';
import List from './List/List';

const App = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmins = async (_id) => {
    if (confirm(`WARNING!\n Are you sure you want to delete this admin?`)) {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${_id}`, {
          method: 'DELETE'
        });
        alert(`Admin delete ID:${_id}`);
        setAdmins([...admins.filter((listItem) => listItem._id !== _id)]);
      } catch (error) {
        alert(`Error\n${error}`);
        console.error(error);
      }
    }
  };

  return (
    <div className="App">
      <List admins={admins} setAdmins={setAdmins} deleteAdmins={deleteAdmins} />
    </div>
  );
};

export default App;
