import {
  GET_ALL_TIMESHEETS_ERROR,
  GET_ALL_TIMESHEETS_SUCCESS,
  GET_ALL_TIMESHEETS_PENDING
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
    default:
      return state;
  }
};
