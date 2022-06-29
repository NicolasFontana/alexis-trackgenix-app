import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  CLEAN_ERROR,
  SET_AUTHENTICATION,
  GET_ME_PENDING,
  GET_ME_SUCCESS,
  GET_ME_ERROR
} from './constants';

const initialState = {
  isFetching: true,
  authenticated: undefined,
  user: undefined,
  error: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        authenticated: action.payload
      };
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CLEAN_ERROR: {
      return {
        ...state,
        error: initialState.error
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
        isFetching: false
      };
    }
    case GET_ME_PENDING: {
      return {
        ...state,
        isFetching: true,
        error: initialState.error
      };
    }
    case GET_ME_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        user: action.payload
      };
    }
    case GET_ME_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
