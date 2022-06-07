import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import Table from '../Shared/Table/Table';
import Preloader from '../Shared/Preloader/Preloader';

function Tasks() {
  const [tasks, saveTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/tasks`)
      .then((response) => response.json())
      .then((response) => {
        saveTasks(response.data);
        setLoading(false);
      });
  }, []);

  const delTask = (id) => {
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) {
      saveTasks([...tasks.filter((task) => task._id !== id)]);
      return fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: 'DELETE'
      })
        .then((response) => response.json())
        .then((response) => {
          alert('Task deleted successfully', response.msg);
        });
    }
  };

  return loading ? (
    <Preloader>
      <p>Loading Tasks</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2>TASKS</h2>
      <Table
        data={tasks}
        headers={['taskName', 'startDate', 'workedHours', 'description', 'status']}
        titles={['Task Name', 'Start Date', 'Worked Hours', 'Description', 'Status']}
        delAction={delTask}
        editAction="todavia no hay"
      />
      <a className={styles.anchor}>Add New Task</a>
    </section>
  );
}

export default Tasks;
