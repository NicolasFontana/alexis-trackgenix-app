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
  PUT_TIMESHEET_SUCCESS
} from './constants';

const initialState = {
  listTimesheet: [],
  loading: false,
  error: ''
};

export const timesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TIMESHEETS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case GET_ALL_TIMESHEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        listTimesheet: action.payload
      };
    case GET_ALL_TIMESHEETS_PENDING:
      return {
        ...state,
        loading: true
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        listTimesheet: state.listTimesheet.filter((timesheet) => timesheet._id !== action.payload)
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        loading: true
      };
    case CREATE_TIMESHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CREATE_TIMESHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        listTimesheet: [...state.listTimesheet, action.payload]
      };
    case CREATE_TIMESHEET_PENDING:
      return {
        ...state,
        loading: true
      };
    case PUT_TIMESHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case PUT_TIMESHEET_SUCCESS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
