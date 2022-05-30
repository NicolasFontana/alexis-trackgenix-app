import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import AddTask from './AddTask/AddTask';
import List from './List/List';
// import Modal from './Modal/Modal';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addItem = ({ taskName, startDate, workedHours, description, status }) => {
    const newTask = {
      taskName,
      startDate,
      workedHours,
      description,
      status
    };

    saveTasks([...tasks, newTask]);
  };

  const delItem = (id) => {
    saveTasks([...tasks.filter((task) => task._id !== id)]);
  };

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  return (
    <section className={styles.container}>
      <AddTask addItem={addItem} />
      <List tasks={tasks} delItem={delItem} />
      {/* <Modal show={showModal} closeModal={closeModal} /> */}
    </section>
  );
}

export default Tasks;
