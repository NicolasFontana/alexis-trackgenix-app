import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectById } from 'redux/projects/thunks';
import { useParams } from 'react-router-dom';
import styles from 'Components/Employee/Home/home.module.css';

const ProjectPage = () => {
  const dispatch = useDispatch();
  const project = useSelector((state) => state.projects.list);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProjectById(id));
  }, []);

  console.log(project);

  return (
    <section className={styles.container}>
      <h2>Project Page</h2>
    </section>
  );
};

export default ProjectPage;
