import {
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
  GET_PROJECT_PENDING,
  GET_PROJECT_SUCCESS
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  message: ''
};

export const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((t) => t._id !== action.payload),
        isLoading: false
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
