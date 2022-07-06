import React from 'react';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonEdit from '../../Shared/Buttons/ButtonEdit';
import styles from './table.module.css';

const Table = (props) => {
  const { data, titles, headers, delAction, editAction, modifiers, redirect } = props;

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
            {editAction ? <th className={styles.th}></th> : null}
            {delAction ? <th className={styles.th}></th> : null}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row) => {
            return (
              <tr
                key={row._id}
                className={styles.tr}
                onClick={() => {
                  redirect(row._id);
                }}
              >
                {headers.map((header, index) => {
                  return (
                    <td key={`${row._id}-${index}`} className={styles.td}>
                      {modifiers[header] ? modifiers[header](row[header]) : row[header]}
                    </td>
                  );
                })}
                {editAction ? (
                  <td className={styles.tdButton}>
                    <ButtonEdit
                      clickAction={() => {
                        editAction(row._id);
                      }}
                    ></ButtonEdit>
                  </td>
                ) : null}
                {delAction ? (
                  <td className={styles.tdButton}>
                    <ButtonDelete
                      clickAction={() => {
                        delAction(row._id);
                      }}
                    ></ButtonDelete>
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
