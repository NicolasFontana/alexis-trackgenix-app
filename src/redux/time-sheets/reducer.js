import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  CREATE_TIMESHEET_PENDING,
  CREATE_TIMESHEET_SUCCESS,
  CREATE_TIMESHEET_ERROR,
  PUT_TIMESHEET_PENDING,
  PUT_TIMESHEET_SUCCESS,
  PUT_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR
} from './constants';

const initialState = {
  listTimesheet: [],
  isLoading: false,
  error: ''
};

export const timesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET TIMESHEETS
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        listTimesheet: action.payload,
        isLoading: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    //CREATE TIMESHEET
    case CREATE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_TIMESHEET_SUCCESS:
      return {
        ...state,
        listTimesheet: [...state.listTimesheet, action.payload],
        isLoading: false
      };
    case CREATE_TIMESHEET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    //EDIT TIMESHEET
    case PUT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.listTimesheet.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
        isLoading: false
      };
    case PUT_TIMESHEET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    //DELETE TIMESHEET
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        listTimesheet: state.listTimesheet.filter((timesheet) => timesheet._id !== action.payload),
        isLoading: false
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
