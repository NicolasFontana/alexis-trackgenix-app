import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import ButtonAdd from '../Shared/Buttons/ButtonAdd/index';
import ModalForm from '../Shared/ModalForm';
import FormAdd from './FormAdd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimesheets, deleteTimesheet } from '../../redux/time-sheets/thunks';

function TimeSheets() {
  const dispatch = useDispatch();
  const listTimesheets = useSelector((state) => state.timesheets.listTimesheet);
  const loading = useSelector((state) => state.timesheets.loading);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const [showModalAdd, setShowModalAdd] = useState();
  let modalDelete;
  let modalAdd;

  useEffect(() => {
    dispatch(getAllTimesheets());
  }, []);

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  if (showModalDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalDelete}
        handleClose={() => {
          setShowModalDelete(false);
        }}
        confirmDelete={() => {
          dispatch(deleteTimesheet(timeSheetId));
          setShowModalDelete(false);
        }}
        title="Delete Timesheet"
        message="Are you sure you want to delete this timesheet?"
      />
    );
  }

  if (showModalAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalAdd} handleClose={closeModalAdd} title="Add Timesheet">
        <FormAdd closeModalForm={closeModalAdd} />
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

  return loading && !showModalAdd && !showModalDelete ? (
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
    </section>
  );
}

export default TimeSheets;
