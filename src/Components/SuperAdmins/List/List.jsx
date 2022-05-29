import React from 'react';
import ListItem from '../ListItem/ListItem';

const List = ({ superAdmins, deleteSuperA }) => {
  console.log(superAdmins);
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
          {superAdmins.map((item) => (
            <ListItem key={item._id} listItem={item} deleteSuperA={deleteSuperA} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
