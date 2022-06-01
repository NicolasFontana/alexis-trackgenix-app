import { useState } from 'react';
import styles from './listmembers.module.css';
import ListItemMember from '../ListItemMember/ListItemMember';

const ListMembers = ({ project, onAdd }) => {
  const [members] = onAdd ? useState([]) : useState(project[0].members);
  return onAdd ? (
    <></>
  ) : !members.length ? (
    <a href={`addmembers?id=${project[0]._id}`} className={styles.addmember}>
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
      <a href={`addmembers?id=${project[0]._id}`}>Add or edit members</a>
    </div>
  );
};

export default ListMembers;
