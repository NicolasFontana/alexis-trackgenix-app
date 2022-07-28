import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_DELETED_PROJECTS_PENDING,
  GET_DELETED_PROJECTS_SUCCESS,
  GET_DELETED_PROJECTS_ERROR,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  REMOVE_PROJECT_PENDING,
  REMOVE_PROJECT_SUCCESS,
  REMOVE_PROJECT_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: true,
  error: false,
  message: ''
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET PROJECTS
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //GET DELETED PROJECTS
    case GET_DELETED_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_DELETED_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_DELETED_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //ADD PROJECT
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        error: false
      };
    case ADD_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    //UPDATE PROJECT
    case UPDATE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_PROJECT_SUCCESS:
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
    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    //DELETE PROJECT
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
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
    case REMOVE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
        isLoading: false
      };
    case REMOVE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case REMOVE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
