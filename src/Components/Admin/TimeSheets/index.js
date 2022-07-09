import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTimesheets, deleteTimesheet } from 'redux/time-sheets/thunks';
import { getProjects } from 'redux/projects/thunks';
import { getTasks } from 'redux/tasks/thunks';
import {
  Preloader,
  Table,
  ConfirmModal,
  ButtonAdd,
  ModalForm,
  ErrorSuccessModal
} from 'Components/Shared';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import styles from './time-sheets.module.css';

function TimeSheets() {
  const dispatch = useDispatch();
  const listTimesheets = useSelector((state) => state.timesheets.listTimesheet);
  const isLoading = useSelector((state) => state.timesheets.isLoading);

  const timeSheetTable = [];
  const [response, setResponse] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const [showModalAdd, setShowModalAdd] = useState();
  const [showModalEdit, setShowModalEdit] = useState();

  let modalDelete;
  let modalAdd;
  let modalEdit;

  useEffect(() => {
    dispatch(getAllTimesheets());
    dispatch(getProjects());
    dispatch(getTasks());
  }, [!showModalAdd && !showModalDelete && !showModalEdit && !showSuccessModal]);

  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  const timesheetFormatted = (listTimesheets) => {
    listTimesheets.forEach((timeSheet) => {
      timeSheetTable.push({
        _id: timeSheet._id,
        projectName: timeSheet.projectId.name,
        taskId: timeSheet.Task[0].taskId?._id,
        taskName: timeSheet.Task[0].taskId?.taskName,
        startDate: timeSheet.Task[0].taskId?.startDate,
        workedHours: timeSheet.Task[0].taskId?.workedHours,
        description: timeSheet.Task[0].taskId?.description,
        status: timeSheet.Task[0].taskId?.status,
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
          dispatch(deleteTimesheet(timeSheetId, setResponse)).then(() => {
            setShowModalDelete(false);
            setShowSuccessModal(true);
          });
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

  return isLoading && !showModalAdd && !showModalDelete && !showModalEdit && !showSuccessModal ? (
    <section className={styles.containerPreloader}>
      <Preloader>
        <p>Loading Timesheets</p>
      </Preloader>
    </section>
  ) : (
    <section className={styles.container}>
      <h2 className={styles.timesheets}>Timesheets</h2>
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
        modifiers={{
          startDate: (x) => x?.slice(0, 10),
          approved: (x) => (x ? 'Yes' : 'No')
        }}
      />
      {isLoading ? <Preloader /> : null}
      {modalDelete}
      {modalAdd}
      {modalEdit}
      <ButtonAdd
        className={styles.buttonAdd}
        clickAction={() => {
          setShowModalAdd(true);
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

export default TimeSheets;
