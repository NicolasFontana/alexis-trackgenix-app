import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_DELETED_TASKS_PENDING,
  GET_DELETED_TASKS_SUCCESS,
  GET_DELETED_TASKS_ERROR,
  ADD_TASK_PENDING,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  EDIT_TASK_PENDING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET TASKS
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    //GET DELETED TASKS
    case GET_DELETED_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_DELETED_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_DELETED_TASKS_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    //ADD TASK
    case ADD_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_TASK_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    //EDIT TASK
    case EDIT_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_TASK_SUCCESS:
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
    case EDIT_TASK_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    //DELETE TASK
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload),
        isLoading: false
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
