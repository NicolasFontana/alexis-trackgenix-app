import React from 'react';

const ListItem = ({ listItem, deleteAdmins }) => {
  const handleDelete = () => {
    deleteAdmins(listItem._id);
  };

  return (
    <tr className="rows">
      <td>{listItem._id}</td>
      <td>{listItem.firstName}</td>
      <td>{listItem.lastName}</td>
      <td>{listItem.email}</td>
      <td>{listItem.password}</td>
      <td>{listItem.active.toString()}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
