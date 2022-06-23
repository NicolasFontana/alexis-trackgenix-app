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
  loading: false,
  error: ''
};

export const timesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET TIMESHEETS
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        loading: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        loading: false,
        listTimesheet: action.payload
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    //CREATE TIMESHEET
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
    case CREATE_TIMESHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    //EDIT TIMESHEET
    case PUT_TIMESHEET_PENDING:
      return {
        ...state,
        loading: true
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
        loading: false,
        error: action.payload
      };
    //DELETE TIMESHEET
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        loading: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        loading: false,
        listTimesheet: state.listTimesheet.filter((timesheet) => timesheet._id !== action.payload)
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
