import React from 'react';
import styles from './list.module.css';
import ListItem from '../ListItem/ListItem';

const List = ({ list, deleteItem }) => {
  return (
    <div className={styles.table}>
      <table>
        <thead className={styles.row}>
          <tr>
            <th> ID </th>
            <th> Name </th>
            <th> Description </th>
            <th> Start Date </th>
            <th> End Date </th>
            <th> Client </th>
            <th> Active </th>
            <th> Members </th>
            <th></th>
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
