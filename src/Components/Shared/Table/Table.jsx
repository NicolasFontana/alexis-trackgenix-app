import React from 'react';
import { useState } from 'react';
import ButtonDelete from '../../Shared/Buttons/ButtonDelete';
import ButtonEdit from '../../Shared/Buttons/ButtonEdit';
import styles from './table.module.css';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Table = (props) => {
  const { data, titles, headers, delAction, editAction, modifiers, redirect, sort, sortModifiers } =
    props;
  const [sortDirection, setSortDirection] = useState(sort);

  const sortAscending = (header) => {
    // Find a defined value inside the column for reference
    let refValue = data.find((item) => item[header] !== null && item[header] !== undefined)[header];
    // Reset arrows and define new sort
    setSortDirection({ ...sort, [header]: 'down' });
    // Modifier (members, employeeId, etc) --> Sorted as a string
    if (sortModifiers && sortModifiers[header]) {
      data.sort((a, b) =>
        sortModifiers[header](a[header])?.localeCompare(sortModifiers[header](b[header]))
      );
      // Number
    } else if (!isNaN(refValue) && !isNaN(parseFloat(refValue))) {
      data.sort((a, b) => a[header] - b[header]);
      // Boolean
    } else if (typeof refValue === 'boolean') {
      data.sort((a, b) => b[header] - a[header]);
      // String or Date
    } else if (typeof refValue === 'string') {
      data.sort((a, b) => a[header]?.localeCompare(b[header]));
      // Array
    } else if (Array.isArray(refValue)) {
      data.sort((a, b) => a[header]?.length - b[header]?.length);
    }
  };

  const sortDescending = (header) => {
    let refValue = data.find((item) => item[header] !== null && item[header] !== undefined)[header];
    setSortDirection({ ...sort, [header]: 'up' });
    if (sortModifiers && sortModifiers[header]) {
      data.sort((a, b) =>
        sortModifiers[header](b[header])?.localeCompare(sortModifiers[header](a[header]))
      );
    } else if (!isNaN(refValue) && !isNaN(parseFloat(refValue))) {
      data.sort((a, b) => b[header] - a[header]);
    } else if (typeof refValue === 'boolean') {
      data.sort((a, b) => a[header] - b[header]);
    } else if (typeof refValue === 'string') {
      data.sort((a, b) => b[header]?.localeCompare(a[header]));
    } else if (Array.isArray(refValue)) {
      data.sort((a, b) => b[header]?.length - a[header]?.length);
    }
  };

  return (
    <table className={styles.table}>
      <thead className={styles.th}>
        <tr>
          {headers.map((header, index) => {
            return (
              <th key={header} className={styles.tableCell}>
                {titles[index]}
                {sortDirection && sortDirection[header] && (
                  <>
                    <FontAwesomeIcon
                      icon={faArrowDown}
                      onPointerDown={() => {
                        sortAscending(header);
                      }}
                      style={sortDirection[header] === 'down' && { color: '#76a068' }}
                    />
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      onPointerDown={() => {
                        sortDescending(header);
                      }}
                      style={sortDirection[header] === 'up' && { color: '#76a068' }}
                    />
                  </>
                )}
              </th>
            );
          })}
          {editAction ? <th className={styles.th}></th> : null}
          {delAction ? <th className={styles.th}></th> : null}
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data?.map((row) => {
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
