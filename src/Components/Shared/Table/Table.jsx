import React from 'react';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonEdit from '../../Shared/Buttons/ButtonEdit';
import styles from './table.module.css';

const Table = (props) => {
  const { data, titles, headers, delAction, editAction } = props;

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.th}>
          <tr>
            {headers.map((header, index) => {
              return (
                <th key={header} className={styles.tableCell}>
                  {titles[index]}
                </th>
              );
            })}
            <th className={styles.th}></th>
            <th className={styles.th}></th>
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row) => {
            return (
              <tr key={row._id} className={styles.tr}>
                {headers.map((header, index) => {
                  return (
                    <td key={`${row._id}-${index}`} className={styles.td}>
                      {Array.isArray(row[header])
                        ? row[header].length
                        : row[header] === false || row[header] === true
                        ? row[header].toString()
                        : row[header]}
                    </td>
                  );
                })}
                <td className={styles.tdButton}>
                  <ButtonEdit
                    clickAction={() => {
                      editAction(row._id);
                    }}
                  ></ButtonEdit>
                </td>
                <td className={styles.tdButton}>
                  <ButtonDelete
                    clickAction={() => {
                      delAction(row._id);
                    }}
                  ></ButtonDelete>
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
