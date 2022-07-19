import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, generatePath } from 'react-router-dom';
import { getEmployees } from 'redux/employees/thunks';
// import { getAllTimesheets } from 'redux/time-sheets/thunks';
import styles from './memberTimesheetPage.module.css';
import {
  Preloader,
  Table,
  // ModalForm,
  // ConfirmModal,
  // ErrorSuccessModal,
  ButtonText
} from 'Components/Shared';

const MemberTimesheetPage = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const { id, memberId } = useParams();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const member = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === memberId
  );
  // const timesheets = useSelector((state) => state.timesheets.listTimesheet).filter(
  //   (timesheet) =>
  //     member?.timeSheets.some((memberTimesheet) => memberTimesheet._id === timesheet._id) &&
  //     timesheet.projectId._id === id
  // );
  const redirectAction = (timesheetId) => {
    history.push(
      generatePath('/employee/projects/:id/members/:memberId/timesheets/:timesheetId', {
        id: id,
        memberId: memberId,
        timesheetId
      })
    );
  };

  useEffect(() => {
    dispatch(getEmployees());
    // dispatch(getAllTimesheets());
  }, []);

  // console.log(member);
  // console.log(timesheets);

  return isLoading ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Project</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <ButtonText
        label="Go back"
        clickAction={() => {
          history.push(generatePath('/employee/projects/:id', { id: id }));
        }}
      ></ButtonText>
      <h2>Member Timesheets</h2>
      <h3>{`${member?.firstName} ${member?.lastName}`}</h3>
      <Table
        data={member?.timeSheets}
        headers={['projectId', '', 'approved']}
        titles={['Project', 'Worked hours', 'Approved']}
        modifiers={{
          projectId: (x) => member.projects.find((project) => project._id === x).name,
          approved: (x) => (x ? 'Approved' : 'Not approved')
        }}
        redirect={redirectAction}
      />
    </section>
  );
};

export default MemberTimesheetPage;
