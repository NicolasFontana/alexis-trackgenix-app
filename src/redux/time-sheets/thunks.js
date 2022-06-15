import {
  getAllTimesheetsPending,
  getAllTimesheetsError,
  getAllTimesheetsSuccess,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError,
  createTimesheetPending,
  createTimesheetSuccess,
  createTimesheetError
} from './actions';

export const getAllTimesheets = () => {
  return (dispatch) => {
    dispatch(getAllTimesheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAllTimesheetsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAllTimesheetsError(error.toString()));
      });
  };
};

export const deleteTimesheet = (id) => {
  return (dispatch) => {
    dispatch(deleteTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteTimesheetSuccess(response.data));
        dispatch(getAllTimesheets());
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteTimesheetError(error.toString()));
      });
  };
};

export const createTimesheet = (projectId, task, approved, setMessage) => {
  return (dispatch) => {
    console.log(projectId);
    console.log(task);
    console.log(approved);
    dispatch(createTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        Task: [{ taskId: task }],
        approved: approved == 'true' ? true : approved == 'false' ? false : ''
      })
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(createTimesheetSuccess(response.data));
        dispatch(getAllTimesheets());
        setMessage(response);
        return response.data;
      })
      .catch((error) => {
        dispatch(createTimesheetError(error.toString()));
        setMessage(error);
      });
  };
};
