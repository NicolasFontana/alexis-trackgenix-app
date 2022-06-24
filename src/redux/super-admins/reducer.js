import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMIN_PENDING,
  POST_SUPER_ADMIN_SUCCESS,
  POST_SUPER_ADMIN_ERROR,
  PUT_SUPER_ADMIN_PENDING,
  PUT_SUPER_ADMIN_SUCCESS,
  PUT_SUPER_ADMIN_ERROR,
  DELETE_SUPER_ADMIN_PENDING,
  DELETE_SUPER_ADMIN_SUCCESS,
  DELETE_SUPER_ADMIN_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false
};

export const superAdminsReducer = (state = initialState, action) => {
  switch (action.type) {
    //GET SUPER ADMINS
    case GET_SUPER_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPER_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isLoading: false
      };
    case GET_SUPER_ADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    //POST SUPER ADMIN
    case POST_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false
      };
    case POST_SUPER_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    //PUT SUPER ADMIN
    case PUT_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_SUPER_ADMIN_SUCCESS:
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
    case PUT_SUPER_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    //DELETE SUPER ADMIN
    case DELETE_SUPER_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPER_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((id) => id !== action.payload),
        isLoading: false
      };
    case DELETE_SUPER_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
