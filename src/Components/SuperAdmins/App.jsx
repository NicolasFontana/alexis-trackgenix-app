import React, { useState, useEffect } from 'react';
import List from './List/List';

const App = () => {
  const [superAdmins, setSuperAdmins] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/super-admins`);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteSuperA = (id) => {
    setSuperAdmins([...superAdmins.filter((listItem) => listItem._id !== id)]);
  };

  return (
    <div className="App">
      <List superAdmins={superAdmins} setSuperAdmins={setSuperAdmins} deleteSuperA={deleteSuperA} />
    </div>
  );
};

export default App;
