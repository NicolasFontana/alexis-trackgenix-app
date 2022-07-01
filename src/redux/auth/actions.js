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

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const setAuthentication = (user) => {
  return {
    type: SET_AUTHENTICATION,
    payload: user
  };
};

export const getMePending = () => {
  return {
    type: GET_ME_PENDING
  };
};

export const getMeSuccess = (data) => {
  return {
    type: GET_ME_SUCCESS,
    payload: data
  };
};

export const getMeError = (error) => {
  return {
    type: GET_ME_ERROR,
    payload: error
  };
};
