import React from 'react';
import ListItem from '../ListItem/ListItem';

const List = ({ admins, deleteAdmins }) => {
  console.log(admins);
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th id="id">ID</th>
            <th id="first-name">First Name</th>
            <th id="last-name">Last Name</th>
            <th id="email">Email</th>
            <th id="password">Password</th>
            <th id="active">Active</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((item) => (
            <ListItem key={item._id} listItem={item} deleteAdmins={deleteAdmins} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
