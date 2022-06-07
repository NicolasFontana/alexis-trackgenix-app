import React, { useEffect, useState } from 'react';
import styles from './tasks.module.css';
import TableList from '../Shared/Table/Table';

function Tasks() {
  const [tasks, saveTasks] = useState([]);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`);
      const data = await response.json();
      saveTasks(data.data);
    } catch (error) {
      console.error(error);
    }
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

  return (
    <section className={styles.container}>
      <TableList
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
