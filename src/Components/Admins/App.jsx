import React, { useState, useEffect } from 'react';
import List from './List/List';
import Preloader from '../Shared/Preloader/Preloader';

const App = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`);
      const data = await response.json();
      setAdmins(data.data);
      setLoading(false);
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
        alert(`Admin deleted ID:${_id}`);
        setAdmins([...admins.filter((listItem) => listItem._id !== _id)]);
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
    <div className="App">
      <List admins={admins} setAdmins={setAdmins} deleteAdmins={deleteAdmins} />
    </div>
  );
};

export default App;
