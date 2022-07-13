import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  CREATE_EMPLOYEE_PENDING,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_ERROR,
  UPDATE_EMPLOYEE_PENDING,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_ERROR
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
    default:
      return state;
  }
};
