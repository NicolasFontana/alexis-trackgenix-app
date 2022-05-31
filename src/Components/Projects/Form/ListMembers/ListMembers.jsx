import { useState } from 'react';
import ListItemMember from '../ListItemMember/ListItemMember';

const ListMembers = ({ project, onAdd }) => {
  const [members] = onAdd ? useState([]) : useState(project[0].members);
  return onAdd ? (
    <a href="project/form/addmembers">Click here to add or edit members</a>
  ) : (
    <div>
      <h3>List of current members</h3>
      <table>
        <thead>
          <tr>
            <th id="name">Member</th>
            <th id="role">Role</th>
            <th id="rate">Rate</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <ListItemMember key={member.employeeId._id} member={member} onAdd={onAdd} />
          ))}
        </tbody>
      </table>
      <a href="project/form/addmembers">Add or edit members</a>
    </div>
  );
};

export default ListMembers;
