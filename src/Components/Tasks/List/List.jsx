import React from 'react';
import ListItem from '../ListItem/ListItem';

const List = (props) => {
  const { tasks, delItem } = props;
  // console.log('Array Tasks in LIST: ', tasks);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th id="taskName">Task Name</th>
            <th id="startDate">Start Date</th>
            <th id="workedHours">Worked Hours</th>
            <th id="description">Description</th>
            <th id="status">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <ListItem key={task._id} task={task} delItem={delItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
