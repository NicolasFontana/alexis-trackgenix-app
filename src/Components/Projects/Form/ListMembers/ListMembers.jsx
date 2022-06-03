import { useState } from 'react';
import styles from './listmembers.module.css';
import ListItemMember from '../ListItemMember/ListItemMember';

const ListMembers = ({ project, onAdd, edited }) => {
  let [members] = onAdd ? useState([]) : useState(project[0].members);
  members = members.filter((member) => member.employeeId !== null);
  return onAdd ? (
    <></>
  ) : !members.length ? (
    <a
      onClick={() => {
        edited
          ? (window.location.href = `addmembers?id=${project[0]._id}`)
          : confirm('All unsaved changes will be lost. Are you sure you want to continue?')
          ? (window.location.href = `addmembers?id=${project[0]._id}`)
          : null;
      }}
      className={styles.addmember}
    >
      Click here to add or edit members
    </a>
  ) : (
    <div className={styles.container}>
      <h3>Current team members</h3>
      <table>
        <thead>
          <tr>
            <th id="name">Member</th>
            <th id="role">Role</th>
            <th id="rate">Rate</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) =>
            member.employeeId == null ? (
              <></>
            ) : (
              <ListItemMember key={member.employeeId._id} member={member} onAdd={onAdd} />
            )
          )}
        </tbody>
      </table>
      <a
        onClick={() => {
          edited
            ? (window.location.href = `addmembers?id=${project[0]._id}`)
            : confirm('All unsaved changes will be lost. Are you sure you want to continue?')
            ? (window.location.href = `addmembers?id=${project[0]._id}`)
            : null;
        }}
      >
        Add or edit members
      </a>
      {/* <a href=>Add or edit members</a> */}
    </div>
  );
};

export default ListMembers;
