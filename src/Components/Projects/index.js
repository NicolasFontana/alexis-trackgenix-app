import { useEffect, useState } from 'react';
import List from './List/List';
import styles from './projects.module.css';

const Projects = () => {
  const [list, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/projects`)
      .then((response) => response.json())
      .then((response) => {
        setProjects(response.data);
        console.log(response);
      });
  }, []);

  const deleteItem = async (_id) => {
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
