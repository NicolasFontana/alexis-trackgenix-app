import {
  GET_SUPER_ADMINS_PENDING,
  GET_SUPER_ADMINS_SUCCESS,
  GET_SUPER_ADMINS_ERROR,
  POST_SUPER_ADMINS_PENDING,
  POST_SUPER_ADMINS_SUCCESS,
  POST_SUPER_ADMINS_ERROR,
  DELETE_SUPER_ADMINS_PENDING,
  DELETE_SUPER_ADMINS_SUCCESS,
  DELETE_SUPER_ADMINS_ERROR
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPER_ADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminsPending = () => {
  return {
    type: POST_SUPER_ADMINS_PENDING
  };
};

export const postSuperAdminsSuccess = (data) => {
  return {
    type: POST_SUPER_ADMINS_SUCCESS,
    payload: data
  };
};

export const postSuperAdminsError = (error) => {
  return {
    type: POST_SUPER_ADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminsPending = () => {
  return {
    type: DELETE_SUPER_ADMINS_PENDING
  };
};

export const deleteSuperAdminsSuccess = (dataid) => {
  return {
    type: DELETE_SUPER_ADMINS_SUCCESS,
    payload: dataid
  };
};

export const deleteSuperAdminsError = (error) => {
  return {
    type: DELETE_SUPER_ADMINS_ERROR,
    payload: error
  };
};
