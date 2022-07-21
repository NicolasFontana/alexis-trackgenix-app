import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, ButtonAdd, ModalForm, ErrorSuccessModal } from 'Components/Shared';
import FormAdd from './AddTimesheet';
import { getTasks } from 'redux/tasks/thunks';
import { getEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getAllTimesheets } from 'redux/time-sheets/thunks';
import styles from './time-sheet.module.css';

function Timesheet() {
  const dispatch = useDispatch();
  const employeeId = useSelector((state) => state.auth.user?.data._id);
  const employee = useSelector((state) => state.employees.list).find(
    (employee) => employee._id === employeeId
  );
  const timesheets = useSelector((state) => state.timesheets.listTimesheet).filter(
    (listTimesheet) =>
      employee?.timeSheets.some((employeeTimesheet) => employeeTimesheet._id === listTimesheet._id)
  );
  const [response] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState();

  let modalAdd;

  useEffect(() => {
    dispatch(getTasks());
    dispatch(getEmployees());
    dispatch(getProjects());
    dispatch(getAllTimesheets());
  }, [!showSuccessModal && !showModalAdd]);

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  if (showModalAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalAdd} handleClose={closeModalAdd} title="Add Timesheet">
        <FormAdd closeModalForm={closeModalAdd} />
      </ModalForm>
    );
  }

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employee Timesheets</h2>
      {modalAdd}
      <ButtonAdd
        className={styles.buttonAdd}
        clickAction={() => {
          setShowModalAdd(true);
        }}
      />
      <Table
        data={timesheets}
        headers={['projectId', 'approved', 'Task', 'createdAt']}
        titles={['Project', 'PMs approval', 'Worked hours', 'Period']}
        modifiers={{
          projectId: (x) => x?.name,
          approved: (x) => (x ? 'Approved' : 'Not approved'),
          Task: (x) =>
            x?.reduce((previous, current) => {
              return previous + current.taskId.workedHours;
            }, 0),
          createdAt: (x) => x?.slice(0, 7)
        }}
      />
      <ErrorSuccessModal
        show={showSuccessModal}
        closeModal={() => {
          setShowSuccessModal(false);
        }}
        closeModalForm={() => {
          setShowSuccessModal(false);
        }}
        successResponse={response}
      />
    </section>
  );
}

export default Timesheet;
