import { useEffect, useState } from 'react';
import styles from './projects.module.css';
import List from './List/List';

const Projects = () => {
  const [list, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}api/projects/`)
      .then((response) => response.json())
      .then((response) => {
        console.log('data', response);
        setProjects(response.data);
      });
  }, []);

  const deleteItem = (_id) => {
    setProjects([...list.filter((listItem) => listItem._id !== _id)]);
  };

  return (
    <section className={styles.container}>
      <h2> Projects </h2>
      <List list={list} setProjects={setProjects} deleteItem={deleteItem} />
    </section>
  );
};

export default Projects;
