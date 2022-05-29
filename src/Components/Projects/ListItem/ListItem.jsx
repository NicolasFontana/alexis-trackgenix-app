import React from 'react';

const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = (_id) => {
    deleteItem(_id);
  };
  return (
    <tr className="list-rows">
      <td>{listItem.name} </td>
      <td>{listItem.description}</td>
      <td>{listItem.startDate}</td>
      <td>{listItem.endDate}</td>
      <td>{listItem.client}</td>
      <td>{listItem.active}</td>
      <td>{listItem.members.length}</td>
      <td>{listItem.active.toString()}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
