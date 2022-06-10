import styles from './listitemmember.module.css';

const ListItemMember = ({ member, onDelete }) => {
  return (
    <tr className={styles.row}>
      <td>
        {member.employeeId.lastName}, {member.employeeId.firstName}
      </td>
      <td>{member.role}</td>
      <td>{member.rate}</td>
      <td>
        <a onClick={() => onDelete(member.employeeId._id)}>Delete</a>
      </td>
    </tr>
  );
};

export default ListItemMember;
