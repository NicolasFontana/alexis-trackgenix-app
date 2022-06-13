import styles from './listitemmember.module.css';
import ButtonDelete from '../../../Shared/Buttons/ButtonDelete';

const ListItemMember = ({ member, onDelete }) => {
  return (
    <tr className={styles.row}>
      <td>
        {member.employeeId.lastName}, {member.employeeId.firstName}
      </td>
      <td>{member.role}</td>
      <td>{member.rate}</td>
      <td>
        <ButtonDelete
          clickAction={() => {
            onDelete(member.employeeId._id);
          }}
        ></ButtonDelete>
      </td>
    </tr>
  );
};

export default ListItemMember;
