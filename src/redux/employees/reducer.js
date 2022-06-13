import { GET_EMPLOYEES_PENDING, GET_EMPLOYEES_SUCCESS, GET_EMPLOYEES_ERROR } from './constants';

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
    default:
      return state;
  }
};
