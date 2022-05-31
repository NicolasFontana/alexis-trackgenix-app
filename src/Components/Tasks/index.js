import { useEffect, useState } from 'react';
import styles from './tasks.module.css';
// import Form from './Form';
import List from './List/List';
import Modal from './Modal/Modal';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const delItem = (id) => {
    saveTasks([...tasks.filter((task) => task._id !== id)]);
    return fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
      method: 'DELETE'
    });
  };

  const closeModal = (value) => {
    setShowModal(value);
  };

  return (
    <section className={styles.container}>
      {showModal && (
        <Modal
          title={'Delete successfully'}
          show={showModal}
          setShowModal={setShowModal}
          close={closeModal}
        />
      )}
      {/* <Form setShowModal={setShowModal} /> */}
      <List tasks={tasks} delItem={delItem} setShowModal={setShowModal} />
    </section>
  );
}

export default Tasks;
