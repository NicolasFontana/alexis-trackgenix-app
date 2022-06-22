import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimesheets, deleteTimesheet } from 'redux/time-sheets/thunks';
import { Preloader, Table, ConfirmModal, ButtonAdd, ModalForm } from 'Components/Shared';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const dispatch = useDispatch();
  const listTimesheets = useSelector((state) => state.timesheets.listTimesheet);
  const loading = useSelector((state) => state.timesheets.loading);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const [showModalAdd, setShowModalAdd] = useState();
  const [showModalEdit, setShowModalEdit] = useState();
  let modalDelete;
  let modalAdd;
  let modalEdit;

  useEffect(() => {
    dispatch(getAllTimesheets());
  }, []);

  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

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

  if (showModalEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalEdit} handleClose={closeModalEdit} title="Edit Timesheet">
        <FormEdit
          closeModalEdit={closeModalEdit}
          timesheetItem={listTimesheets.find((item) => item._id === timeSheetId)}
        />
      </ModalForm>
    );
  }

  return loading && !showModalAdd && !showModalDelete && !showModalEdit ? (
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
        editAction={(id) => {
          setTimeSheetId(id);
          setShowModalEdit(true);
        }}
      />
      {loading ? <Preloader /> : null}
      {modalDelete}
      {modalAdd}
      {modalEdit}
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
