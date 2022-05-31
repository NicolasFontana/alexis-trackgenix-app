import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets`);
      const responseJSON = await response.json();
      setTimeSheets(responseJSON.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/${_id}`, {
        method: 'DELETE'
      });
      console.log('test', response);
      confirm(`WARNING!\n Are you sure you want to delete this timesheet?`);
      setTimeSheets([...timeSheets.filter((timeSheet) => timeSheet._id !== _id)]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <List timeSheets={timeSheets} deleteItem={deleteItem} />
    </section>
  );
}

export default TimeSheets;
