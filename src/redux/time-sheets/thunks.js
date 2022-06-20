import {
  getAllTimesheetsPending,
  getAllTimesheetsError,
  getAllTimesheetsSuccess,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError,
  createTimesheetPending,
  createTimesheetSuccess,
  createTimesheetError,
  putTimesheetPending,
  putTimesheetSuccess,
  putTimesheetError
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
    dispatch(createTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: projectId,
        Task: [{ taskId: task }],
        approved: approved
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (!response.error) {
          dispatch(createTimesheetSuccess(response.data));
        }
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

export const putTimesheet = (userInput, id, setMessage) => {
  return (dispatch) => {
    dispatch(putTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        projectId: userInput.projectId,
        Task: [{ taskId: userInput.task }],
        approved: userInput.approved
      })
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(putTimesheetSuccess(response.data));
        dispatch(getAllTimesheets());
        setMessage(response);
        return response.data;
      })
      .catch((error) => {
        dispatch(putTimesheetError(error.toString()));
        setMessage(error);
      });
  };
};
