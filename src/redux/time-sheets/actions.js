import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GET_DELETED_TIMESHEETS_PENDING,
  GET_DELETED_TIMESHEETS_SUCCESS,
  GET_DELETED_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR,
  CREATE_TIMESHEET_PENDING,
  CREATE_TIMESHEET_SUCCESS,
  CREATE_TIMESHEET_ERROR,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_ERROR,
  REMOVE_TIMESHEET_PENDING,
  REMOVE_TIMESHEET_SUCCESS,
  REMOVE_TIMESHEET_ERROR
} from './constants';

export const getAllTimesheetsPending = () => ({
  type: GET_TIMESHEETS_PENDING
});

export const getAllTimesheetsSuccess = (data) => ({
  type: GET_TIMESHEETS_SUCCESS,
  payload: data
});

export const getAllTimesheetsError = (error) => ({
  type: GET_TIMESHEETS_ERROR,
  payload: error
});

export const getDeletedTimesheetsError = (error) => ({
  type: GET_DELETED_TIMESHEETS_ERROR,
  payload: error
});

export const getDeletedTimesheetsPending = () => ({
  type: GET_DELETED_TIMESHEETS_PENDING
});

export const getDeletedTimesheetsSuccess = (data) => ({
  type: GET_DELETED_TIMESHEETS_SUCCESS,
  payload: data
});

export const createTimesheetPending = () => ({
  type: CREATE_TIMESHEET_PENDING
});

export const createTimesheetSuccess = (data) => ({
  type: CREATE_TIMESHEET_SUCCESS,
  payload: data
});

export const createTimesheetError = (error) => ({
  type: CREATE_TIMESHEET_ERROR,
  payload: error
});

export const putTimesheetPending = () => ({
  type: PUT_TIMESHEET_PENDING
});

export const putTimesheetSuccess = (data) => ({
  type: PUT_TIMESHEET_SUCCESS,
  payload: data
});

export const putTimesheetError = (error) => ({
  type: PUT_TIMESHEET_ERROR,
  payload: error
});

export const deleteTimesheetPending = () => ({
  type: DELETE_TIMESHEET_PENDING
});

export const deleteTimesheetSuccess = (data) => ({
  type: DELETE_TIMESHEET_SUCCESS,
  payload: data
});

export const deleteTimesheetError = (error) => ({
  type: DELETE_TIMESHEET_ERROR,
  payload: error
});

export const removeTimesheetPending = () => ({
  type: REMOVE_TIMESHEET_PENDING
});

export const removeTimesheetSuccess = (data) => ({
  type: REMOVE_TIMESHEET_SUCCESS,
  payload: data
});

export const removeTimesheetError = (error) => ({
  type: REMOVE_TIMESHEET_ERROR,
  payload: error
});
