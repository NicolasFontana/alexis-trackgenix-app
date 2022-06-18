import {
  GET_PROJECT_ERROR,
  GET_PROJECT_PENDING,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_BY_ID_PENDING,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_ERROR,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR
} from './constants';

const initialState = {
  project: {},
  list: [],
  isEditing: false,
  isLoading: true,
  error: false
};

export const projectsReducer = (state = initialState, action) => {
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
    case GET_PROJECT_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        project: action.payload,
        isLoading: false
      };
    case GET_PROJECT_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case UPDATE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isEditing: true
      };
    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
