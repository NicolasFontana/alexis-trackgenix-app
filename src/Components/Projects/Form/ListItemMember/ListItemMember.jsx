const ListItemMember = ({ member }) => {
  return (
    <tr>
      <td>
        {member.employeeId.lastName}, {member.employeeId.firstName}
      </td>
      <td>{member.role}</td>
      <td>{member.rate}</td>
    </tr>
  );
};

export default ListItemMember;
