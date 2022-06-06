import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './projects.module.css';
import Preloader from '../Shared/Preloader/Preloader';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => response.json())
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      });
  }, []);

  const deleteItem = async (_id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${_id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
    setProjects([...projects.filter((listItem) => listItem._id !== _id)]);
  };

  return loading ? (
    <Preloader>
      <p>Loading projects</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.projects}> Projects </h2>
      <List projects={projects} setProjects={setProjects} deleteItem={deleteItem} />
      <a href={'/projects/form'}>
        <button className={styles.addbtn}>&#10010;</button>
      </a>
    </section>
  );
};

export default Projects;
