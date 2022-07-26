import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './memberTimesheetPage.module.css';

const MemberTimesheetPage = () => {
  const { id, memberId } = useParams();

  return (
    <section className={styles.container}>
      <h2>Employee Timesheet Page</h2>
      <p>Project ID: {id} </p>
      <p>Employee ID: {memberId} </p>
    </section>
  );
};

export default MemberTimesheetPage;
