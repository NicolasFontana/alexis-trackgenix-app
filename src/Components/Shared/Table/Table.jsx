import React from 'react';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonEdit from '../../Shared/Buttons/ButtonEdit';
import styles from './table.module.css';

const Table = (props) => {
  const { data, titles, headers, delAction, editAction, modifiers, redirect } = props;

  return (
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
          {editAction ? <th className={styles.th}></th> : null}
          {delAction ? <th className={styles.th}></th> : null}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data.map((row) => {
          return (
            <tr key={row._id ? row._id : row.employeeId._id} className={styles.tr}>
              {headers.map((header, index) => {
                return (
                  <td
                    key={`${row._id ? row._id : row.employeeId_id}-${index}`}
                    className={redirect ? styles.tdPointer : styles.td}
                    onPointerDown={() =>
                      redirect ? redirect(row._id ? row._id : row.employeeId._id) : null
                    }
                  >
                    {modifiers
                      ? modifiers[header]
                        ? modifiers[header](row[header])
                        : row[header]
                      : row[header]}
                  </td>
                );
              })}
              {editAction ? (
                <td className={styles.tdButton}>
                  <ButtonEdit
                    clickAction={() => {
                      editAction(row._id ? row._id : row.employeeId._id);
                    }}
                  ></ButtonEdit>
                </td>
              ) : null}
              {delAction ? (
                <td className={styles.tdButton}>
                  <ButtonDelete
                    clickAction={() => {
                      delAction(row._id ? row._id : row.employeeId._id);
                    }}
                  ></ButtonDelete>
                </td>
              ) : null}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
