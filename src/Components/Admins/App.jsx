import React, { useState, useEffect } from 'react';
import List from './List/List';

const App = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/admins`);
      const data = await response.json();
      setAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteAdmins = (id) => {
    setAdmins([...admins.filter((listItem) => listItem._id !== id)]);
  };

  return (
    <div className="App">
      <List admins={admins} setAdmins={setAdmins} deleteAdmins={deleteAdmins} />
    </div>
  );
};

export default App;
