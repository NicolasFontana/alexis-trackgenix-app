import {
  getAllTimesheetsPending,
  getAllTimesheetsError,
  getAllTimesheetsSuccess,
  getDeletedTimesheetsPending,
  getDeletedTimesheetsError,
  getDeletedTimesheetsSuccess,
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
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAllTimesheetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllTimesheetsError(error.toString()));
      });
  };
};

export const getDeletedTimesheets = () => {
  return (dispatch) => {
    dispatch(getDeletedTimesheetsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/deleted`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getDeletedTimesheetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getDeletedTimesheetsError(error.toString()));
      });
  };
};

export const createTimesheet = (projectId, setMessage) => {
  return (dispatch) => {
    dispatch(createTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify({
        projectId: projectId,
        approved: false
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          throw response.error;
        }
        dispatch(createTimesheetSuccess(response.data));
        setMessage(response);
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
        'Content-type': 'application/json',
        token: sessionStorage.getItem('token')
      },
      body: JSON.stringify(userInput)
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(putTimesheetSuccess(id));
        setMessage(response);
      })
      .catch((error) => {
        dispatch(putTimesheetError(error.toString()));
        setMessage(error);
      });
  };
};

export const deleteTimesheet = (id, setResponse) => {
  return (dispatch) => {
    dispatch(deleteTimesheetPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/time-sheets/${id}`, {
      method: 'DELETE',
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteTimesheetSuccess(id));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(deleteTimesheetError(error.toString()));
        setResponse(error);
      });
  };
};
