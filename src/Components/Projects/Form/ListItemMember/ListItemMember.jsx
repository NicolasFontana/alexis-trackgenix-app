import styles from './listitemmember.module.css';

const ListItemMember = ({ member }) => {
  return (
    <tr className={styles.row}>
      <td>
        {member.employeeId.lastName}, {member.employeeId.firstName}
      </td>
      <td>{member.role}</td>
      <td>{member.rate}</td>
    </tr>
  );
};

export default ListItemMember;
