import {
  getAllTimesheetsPending,
  getAllTimesheetsError,
  getAllTimesheetsSuccess,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError
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
