import React from 'react';
import styles from './table.module.css';

// data={tasks}
// headers={['taskName', 'startDate', 'workedHours', 'description', 'status']}
// titles={['Task Name', 'Start Date', 'Worked Hours', 'Description', 'Status']}
// delAction = handle del function (comes from his parent)
// editAction = handle edit function (comes from his parent)

const Table = (props) => {
  const { data, titles, headers, delAction, editAction } = props;

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {headers.map((header, index) => {
              return (
                <th key={index} className={styles.tableCell}>
                  {titles[index]}
                </th>
              );
            })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row.id}>
                {headers.map((header, index) => {
                  return (
                    <td key={index} className={styles.tableCell}>
                      {row[header]}
                    </td>
                  );
                })}
                <td>
                  <button onClick={() => editAction(row._id)}>&#9998;</button>
                  <button onClick={() => delAction(row._id)}>&#10006;</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
