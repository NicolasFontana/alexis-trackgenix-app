import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import List from './List/List';
import Modal from './Modal/Modal';
import Preloader from '../Shared/Preloader/Preloader';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showTitle, setShowTitle] = useState('');

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets`);
      const responseJSON = await response.json();
      setTimeSheets(responseJSON.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/${_id}`, {
        method: 'DELETE'
      });
      const responseJSON = await response.json();
      if (responseJSON.error === false) {
        setShowTitle(responseJSON.message);
      }
      setTimeSheets([...timeSheets.filter((timeSheet) => timeSheet._id !== _id)]);
    } catch (error) {
      console.error(error);
    }
  };

  return loading ? (
    <Preloader>
      <p>Loading timesheets</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <List timeSheets={timeSheets} deleteItem={deleteItem} setShowModal={setShowModal} />
      <Modal showModal={showModal} setShowModal={setShowModal} showTitle={showTitle} />
    </section>
  );
}

export default TimeSheets;
