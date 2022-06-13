import { useState } from 'react';
import styles from './listmembers.module.css';
import ListItemMember from '../ListItemMember/ListItemMember';
import ButtonAdd from '../../../Shared/Buttons/ButtonAdd';
import ConfirmModal from '../../../Shared/confirmationModal/confirmModal';
import AlertModal from '../../../Shared/ErrorSuccessModal';

const ListMembers = ({ project, onAdd, functionValue }) => {
  let [members, setMembers] = onAdd ? useState([]) : useState(project[0].members);
  let membersToSave;
  members = members.filter((member) => member.employeeId !== null);
  const [showconfirmModal, setShowconfirmModal] = useState(false);
  const [showErrorSuccessModal, setShowErrorSuccessModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [memberId, setMemberId] = useState('');

  const deleteMember = async (id) => {
    members = members.filter((member) => member.employeeId._id !== id);
    setMembers(members);
    membersToSave = members.map((member) => ({
      employeeId: member.employeeId._id,
      role: member.role,
      rate: member.rate
    }));
    let url = `${process.env.REACT_APP_API_URL}/api/projects/${project[0]._id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ members: membersToSave })
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(data.message);
      } else {
        alert({ error: false, message: 'Member deleted successfully' });
      }
    } catch (error) {
      setAlertMessage(error);
    }
    console.log('holis');
    openAlertModal();
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

  return onAdd ? (
    <></>
  ) : !members.length ? (
    <ButtonAdd
      clickAction={() => {
        functionValue(true);
      }}
    ></ButtonAdd>
  ) : (
    <div className={styles.divcontainer}>
      <h3>Team members</h3>
      <ButtonAdd
        clickAction={() => {
          functionValue(true);
        }}
      ></ButtonAdd>
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
      <AlertModal
        show={showErrorSuccessModal}
        closeModal={closeAlertModal}
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
