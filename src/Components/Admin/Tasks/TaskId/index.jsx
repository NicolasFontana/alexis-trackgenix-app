import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from 'redux/tasks/thunks';
import { useParams } from 'react-router-dom';
import styles from 'Components/Employee/Home/home.module.css';

const TaskId = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.list);
  let task;

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  if (tasks) {
    const { id } = useParams();
    task = tasks.find((task) => task._id === id);
    console.log(task);
  }

  return (
    <section className={styles.container}>
      <h2>Task</h2>
    </section>
  );
};

export default TaskId;
