import {
  GET_ALL_TIMESHEETS_ERROR,
  GET_ALL_TIMESHEETS_SUCCESS,
  GET_ALL_TIMESHEETS_PENDING,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING
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
