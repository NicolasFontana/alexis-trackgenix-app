import React from 'react';
import './list.module.css';
import ListItem from '../ListItem/ListItem';

const List = ({ list, deleteItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th> Name </th>
            <th> Description </th>
            <th> Start Date </th>
            <th> End Date </th>
            <th> Client </th>
            <th> Active </th>
            <th> Members </th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => {
            return <ListItem key={item._id} listItem={item} deleteItem={deleteItem} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;
