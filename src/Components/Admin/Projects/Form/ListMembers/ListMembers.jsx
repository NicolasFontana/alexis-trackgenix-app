import { ButtonAdd, ConfirmModal, ErrorSuccessModal } from 'Components/Shared';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from 'redux/projects/thunks';
import ListItemMember from '../ListItemMember/ListItemMember';
import styles from './listmembers.module.css';

const ListMembers = ({ edited, project, functionValue }) => {
  let [members, setMembers] = useState(project.members);
  members = members.filter((member) => member.employeeId !== null);
  let membersToSave;
  const [showconfirmModal, setShowconfirmModal] = useState(false);
  const [showErrorSuccessModal, setShowErrorSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [memberId, setMemberId] = useState('');

  const dispatch = useDispatch();

  const deleteMember = (id) => {
    closeConfirmModal();
    members = members.filter((member) => member.employeeId._id !== id);
    setMembers(members);
    membersToSave = members.map((member) => ({
      employeeId: member.employeeId._id,
      role: member.role,
      rate: member.rate
    }));
    dispatch(
      updateProject(project._id, { members: membersToSave }, (alertMessage) =>
        setAlertMessage({
          error: alertMessage.error,
          message: 'Team member deleted successfully'
        })
      )
    ).then(() => openAlertModal());
  };

  const closeConfirmModal = () => {
    setShowconfirmModal(false);
  };

  const openConfirmModal = (id) => {
    setMemberId(id);
    setShowconfirmModal(true);
  };

  const closeAlertModal = () => {
    setShowErrorSuccessModal(false);
  };

  const openAlertModal = () => {
    setShowErrorSuccessModal(true);
  };

  const handleOnClick = () => {
    edited
      ? confirm('All unsaved changes will be lost. Are you sure you want to continue?')
        ? functionValue(true)
        : null
      : functionValue(true);
  };

  return (
    <div className={styles.divcontainer}>
      <div className={styles.header}>
        <h3>Team members</h3>
        <ButtonAdd
          clickAction={() => {
            handleOnClick();
          }}
        ></ButtonAdd>
      </div>
      <div className={styles.container}>
        <table>
          <thead>
            <tr>
              <th id="name">Member</th>
              <th id="role">Role</th>
              <th id="rate">Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) =>
              member.employeeId == null ? (
                <></>
              ) : (
                <ListItemMember
                  key={member.employeeId._id}
                  member={member}
                  onDelete={openConfirmModal}
                />
              )
            )}
          </tbody>
        </table>
      </div>
      <ErrorSuccessModal
        show={showErrorSuccessModal}
        closeModal={closeAlertModal}
        closeModalForm={closeAlertModal}
        successResponse={alertMessage}
      />
      <ConfirmModal
        isOpen={showconfirmModal}
        handleClose={closeConfirmModal}
        confirmDelete={() => {
          deleteMember(memberId);
        }}
        title={'Delete team member'}
        message={'Are you sure you want to delete this member?'}
      />
    </div>
  );
};

export default ListMembers;
