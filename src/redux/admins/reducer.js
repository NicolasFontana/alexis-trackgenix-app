import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_DELETED_ADMINS_PENDING,
  GET_DELETED_ADMINS_SUCCESS,
  GET_DELETED_ADMINS_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  ADD_ADMIN_ERROR,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: ''
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET ADMINS
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_DELETED_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_DELETED_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_DELETED_ADMINS_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    //ADD ADMIN
    case ADD_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    //EDIT ADMIN
    case EDIT_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_ADMIN_SUCCESS:
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
    case EDIT_ADMIN_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    //DELETE ADMIN
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((admin) => admin._id !== action.payload),
        isLoading: false
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
