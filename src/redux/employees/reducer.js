import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GET_DELETED_EMPLOYEES_PENDING,
  GET_DELETED_EMPLOYEES_SUCCESS,
  GET_DELETED_EMPLOYEES_ERROR,
  CREATE_EMPLOYEE_PENDING,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_PENDING,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR,
  RESTORE_EMPLOYEE_PENDING,
  RESTORE_EMPLOYEE_SUCCESS,
  RESTORE_EMPLOYEE_ERROR,
  REMOVE_EMPLOYEE_PENDING,
  REMOVE_EMPLOYEE_SUCCESS,
  REMOVE_EMPLOYEE_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: ''
};

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case GET_DELETED_EMPLOYEES_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_DELETED_EMPLOYEES_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_DELETED_EMPLOYEES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case CREATE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case CREATE_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UPDATE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
        isLoading: false
      };
    case UPDATE_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case DELETE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((employee) => employee.id !== action.payload),
        isLoading: false
      };
    case DELETE_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case RESTORE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case RESTORE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
        isLoading: false
      };
    case RESTORE_EMPLOYEE_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case REMOVE_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case REMOVE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((employee) => employee._id !== action.payload),
        isLoading: false
      };
    case REMOVE_EMPLOYEE_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
