import {
  GET_ALL_TIMESHEETS_ERROR,
  GET_ALL_TIMESHEETS_SUCCESS,
  GET_ALL_TIMESHEETS_PENDING
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
