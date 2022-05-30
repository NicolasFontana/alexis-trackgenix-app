import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import List from './List/List';

const Projects = () => {
  const [list, setProjects] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/projects`)
      .then((response) => response.json())
      .then((response) => {
        setProjects(response.data);
        console.log(response);
      });
  }, []);

  const deleteItem = async (_id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/projects/${_id}`, {
        method: 'DELETE'
      });
      console.log('response', response);
      confirm(`WARNING!\n Are you sure you want to delete this project?`);
    } catch (error) {
      console.error(error);
    }
    setProjects([...list.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.projects}> Projects </h2>
      <List list={list} setProjects={setProjects} deleteItem={deleteItem} />
      <a href="http://localhost:8000/api/projects/form">
        <button className={styles.addbtn} href="/projects/form">
          &#10010; Add New Project
        </button>
      </a>
    </section>
  );
};

export default Projects;
