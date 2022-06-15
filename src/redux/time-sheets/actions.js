import {
  GET_ALL_TIMESHEETS_ERROR,
  GET_ALL_TIMESHEETS_SUCCESS,
  GET_ALL_TIMESHEETS_PENDING,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  CREATE_TIMESHEET_PENDING,
  CREATE_TIMESHEET_SUCCESS,
  CREATE_TIMESHEET_ERROR,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_ERROR
} from './constants';

export const getAllTimesheetsPending = () => {
  return {
    type: GET_ALL_TIMESHEETS_PENDING
  };
};

export const getAllTimesheetsError = (error) => {
  return {
    type: GET_ALL_TIMESHEETS_ERROR,
    payload: error
  };
};

export const getAllTimesheetsSuccess = (data) => {
  return {
    type: GET_ALL_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const deleteTimesheetPending = () => {
  return {
    type: DELETE_TIMESHEET_PENDING
  };
};

export const deleteTimesheetSuccess = (id) => {
  return {
    type: DELETE_TIMESHEET_SUCCESS,
    payload: id
  };
};

export const deleteTimesheetError = (error) => {
  return {
    type: DELETE_TIMESHEET_ERROR,
    payload: error
  };
};

export const createTimesheetPending = () => {
  return {
    type: CREATE_TIMESHEET_PENDING
  };
};

export const createTimesheetSuccess = (data) => {
  return {
    type: CREATE_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const createTimesheetError = (error) => {
  return {
    type: CREATE_TIMESHEET_ERROR,
    payload: error
  };
};

export const putTimesheetPending = () => {
  return {
    type: PUT_TIMESHEET_PENDING
  };
};

export const putTimesheetSuccess = () => {
  return {
    type: PUT_TIMESHEET_SUCCESS
  };
};

export const putTimesheetError = (error) => {
  return {
    type: PUT_TIMESHEET_ERROR,
    payload: error
  };
};
