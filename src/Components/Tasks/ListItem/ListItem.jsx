import React from 'react';

const ListItem = (props) => {
  const { task, delItem } = props;

  const handleDel = () => {
    delItem(task._id);
  };

  return (
    <tr className="rows">
      <td>{task.taskName}</td>
      <td>{task.startDate}</td>
      <td>{task.workedHours}</td>
      <td>{task.description}</td>
      <td>{task.status}</td>
      <td>
        <button onClick={() => handleDel(task._id)}>X</button>
      </td>
    </tr>
  );
};

export default ListItem;
