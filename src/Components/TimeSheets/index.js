import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import ButtonAdd from '../Shared/Buttons/ButtonAdd/index';
import ModalForm from '../Shared/ModalForm';
import FormAdd from './FormAdd';
// import ErrorSuccessModal from '../Shared/ErrorSuccessModal/index';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimesheets, deleteTimesheet } from '../../redux/time-sheets/thunks';

function TimeSheets() {
  // const [timeSheets, setTimeSheets] = useState([]);
  // const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const listTimesheets = useSelector((state) => state.timesheets.listTimesheet);
  const loading = useSelector((state) => state.timesheets.loading);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const [showModalAdd, setShowModalAdd] = useState();
  // const [showMessageModal, setShowMessageModal] = useState(false);
  // const [message, setMessage] = useState('');
  let modalDelete;
  let modalAdd;

  useEffect(() => {
    dispatch(getAllTimesheets());
  }, [showModalAdd]);

  // const deleteItem = async () => {
  //   const url = `${process.env.REACT_APP_API_URL}/api/time-sheets/${timeSheetId}`;
  //   const options = {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   };
  //   try {
  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     if (response.status !== 200 && response.status !== 201) {
  //       throw new Error(data.message);
  //     } else {
  //       setMessage(data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setMessage(error);
  //   }
  //   // setTimeSheets([...listTimesheets.filter((timesheet) => timeSheet._id !== timeSheetId)]);
  //   setShowModalDelete(false);
  //   setShowMessageModal(true);
  // };

  // const openModalDelete = (id) => {
  //   setTimeSheetId(id);
  //   setShowModalDelete(true);
  // };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  // const closeMessageModal = () => {
  //   setShowMessageModal(false);
  // };

  if (showModalDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalDelete}
        handleClose={closeModalDelete}
        confirmDelete={() => {
          dispatch(deleteTimesheet(timeSheetId));
        }}
        title="Delete Timesheet"
        message="Are you sure you want to delete this timesheet?"
      />
    );
  }

  if (showModalAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalAdd} handleClose={closeModalAdd} title="Add Timesheet">
        <FormAdd closeModalAdd={closeModalAdd} />
      </ModalForm>
    );
  }

  const timeSheetTable = [];
  const timesheetFormatted = (listTimesheets) => {
    listTimesheets.forEach((timeSheet) => {
      timeSheetTable.push({
        _id: timeSheet._id,
        projectName: timeSheet.projectId.name,
        taskId: timeSheet.Task[0].taskId._id,
        taskName: timeSheet.Task[0].taskId.taskName,
        startDate: timeSheet.Task[0].taskId.startDate,
        workedHours: timeSheet.Task[0].taskId.workedHours,
        description: timeSheet.Task[0].taskId.description,
        status: timeSheet.Task[0].taskId.status,
        approved: timeSheet.approved
      });
    });
  };

  timesheetFormatted(listTimesheets);

  return loading ? (
    <Preloader>
      <p>Loading timesheets</p>
    </Preloader>
  ) : (
    <section className={styles.container}>
      <h2>TIMESHEETS</h2>
      <Table
        data={timeSheetTable}
        headers={[
          'projectName',
          'taskId',
          'taskName',
          'startDate',
          'workedHours',
          'description',
          'status',
          'approved'
        ]}
        titles={[
          'Project',
          'Task ID',
          'Task name',
          'Start date',
          'Worked hours',
          'Description',
          'Status',
          'PMs approval'
        ]}
        delAction={(id) => {
          setTimeSheetId(id);
          setShowModalDelete(true);
        }}
        editAction="todavia no hay"
      />
      {modalDelete}
      {modalAdd}
      <ButtonAdd
        className={styles.buttonAdd}
        clickAction={() => {
          setShowModalAdd(true);
        }}
      />
      {/* <ErrorSuccessModal
        show={showMessageModal}
        closeModal={closeMessageModal}
        closeModalForm={closeMessageModal}
        successResponse={message}
      /> */}
    </section>
  );
}

export default TimeSheets;
