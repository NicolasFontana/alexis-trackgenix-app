import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import ButtonAdd from '../Shared/Buttons/ButtonAdd/index';
import ModalForm from '../Shared/ModalForm';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const [showModalAdd, setShowModalAdd] = useState();
  const [showModalEdit, setShowModalEdit] = useState();
  let modalDelete;
  let modalAdd;
  let modalEdit;

  const timeSheetTable = [];
  const timesheetFormatted = (timeSheets) => {
    timeSheets.forEach((timeSheet) => {
      timeSheetTable.push({
        _id: timeSheet._id,
        projectName: timeSheet.projectId.name,
        projectId: timeSheet.projectId._id,
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

  timesheetFormatted(timeSheets);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        setTimeSheets(response.data);
        setLoading(false);
      });
  }, [showModalAdd]);

  const deleteItem = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/${timeSheetId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
    setTimeSheets([...timeSheets.filter((timeSheet) => timeSheet._id !== timeSheetId)]);
    setShowModalDelete(false);
  };

  const openModalDelete = (id) => {
    setTimeSheetId(id);
    setShowModalDelete(true);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  const openModalEdit = (id) => {
    setTimeSheetId(id);
    setShowModalEdit(true);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  if (showModalDelete) {
    modalDelete = (
      <ConfirmModal
        isOpen={showModalDelete}
        handleClose={closeModalDelete}
        confirmDelete={deleteItem}
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

  if (showModalEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalEdit} handleClose={closeModalEdit} title="Edit Timesheet">
        <FormEdit
          closeModalEdit={closeModalEdit}
          timeSheet={timeSheetTable.find((item) => item._id === timeSheetId)}
          timeSheetId={timeSheetId}
        />
      </ModalForm>
    );
  }

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
        delAction={openModalDelete}
        editAction={openModalEdit}
      />
      {modalDelete}
      {modalAdd}
      {modalEdit}
      <ButtonAdd
        clickAction={() => {
          setShowModalAdd(true);
        }}
      />
    </section>
  );
}

export default TimeSheets;
