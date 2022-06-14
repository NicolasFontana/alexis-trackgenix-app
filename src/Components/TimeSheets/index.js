import { useState, useEffect } from 'react';
import styles from './time-sheets.module.css';
import FormEdit from './Form/FormEdit';
import Preloader from '../Shared/Preloader/Preloader';
import Table from '../Shared/Table/Table';
import ConfirmModal from '../Shared/confirmationModal/confirmModal';
import ButtonAdd from '../Shared/Buttons/ButtonAdd/index';
import ModalForm from '../Shared/ModalForm';

function TimeSheets() {
  const [timeSheets, setTimeSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState();
  const [showModalAdd, setShowModalAdd] = useState();
  const [showModalFormEdit, setShowModalFormEdit] = useState(false);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets`);
      const responseJSON = await response.json();
      setTimeSheets(responseJSON.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        setTimeSheets(response.data);
      });
  }, [showModalDelete]);

  const deleteItem = async () => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/${timeSheetId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(error);
    }
    setShowModalDelete(false);
  };

  const openModalDelete = (id) => {
    setTimeSheetId(id);
    setShowModalDelete(true);
  };

  const closeModalDelete = () => {
    setShowModalDelete(false);
  };

  const openModalFormEdit = (id) => {
    setTimeSheetId(id);
    setShowModalFormEdit(true);
  };

  const closeModalFormEdit = () => {
    setShowModalFormEdit(false);
  };

  let modalDelete;
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

  const closeModalAdd = () => {
    setShowModalAdd(false);
  };

  let modalAdd;
  if (showModalAdd) {
    modalAdd = (
      <ModalForm isOpen={showModalAdd} handleClose={closeModalAdd} title="Add Timesheet">
        <div>asd</div>
      </ModalForm>
    );
  }

  let modalEdit;
  if (showModalFormEdit) {
    modalEdit = (
      <ModalForm isOpen={showModalFormEdit} handleClose={closeModalFormEdit} title="Edit Timesheet">
        {/* <div>asd</div> */}
        <FormEdit closeModalForm={closeModalFormEdit} edit={true} itemId={timeSheetId} />
      </ModalForm>
    );
  }

  const timeSheetTable = [];
  const timesheetFormatted = (timeSheets) => {
    timeSheets.forEach((timeSheet) => {
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
  timesheetFormatted(timeSheets);

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
        editAction={openModalFormEdit}
      />
      {modalDelete}
      {modalEdit}
      {modalAdd}
      <ButtonAdd
        clickAction={() => {
          setShowModalAdd(true);
        }}
      />
    </section>
  );
}

export default TimeSheets;
