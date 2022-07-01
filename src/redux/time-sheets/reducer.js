import {
  GET_ALL_TIMESHEETS_ERROR,
  GET_ALL_TIMESHEETS_SUCCESS,
  GET_ALL_TIMESHEETS_PENDING,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  CREATE_TIMESHEET_ERROR,
  CREATE_TIMESHEET_SUCCESS,
  CREATE_TIMESHEET_PENDING,
  PUT_TIMESHEET_ERROR,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_PENDING
} from './constants';

const initialState = {
  listTimesheet: [],
  isLoading: false,
  error: ''
};

export const timesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true
      };
    case GET_ALL_TIMESHEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listTimesheet: action.payload
      };
    case GET_ALL_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listTimesheet: state.listTimesheet.filter((timesheet) => timesheet._id !== action.payload)
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case CREATE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listTimesheet: [...state.listTimesheet, action.payload]
      };
    case CREATE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case PUT_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case PUT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
