import React from 'react';
import styles from './table.module.css';

const Table = (props) => {
  const { data, titles, headers, delAction, editAction } = props;

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            {headers.map((header, index) => {
              return (
                <th key={header} className={styles.tableCell}>
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
              <tr key={row._id}>
                {headers.map((header, index) => {
                  return (
                    <td key={`${row._id}-${index}`} className={styles.tableCell}>
                      {Array.isArray(row[header])
                        ? row[header].length
                        : row[header] === false || row[header] === true
                        ? row[header].toString()
                        : row[header]}
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
