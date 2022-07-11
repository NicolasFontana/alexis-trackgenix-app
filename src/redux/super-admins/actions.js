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

export const getSuperAdminsPending = () => ({
  type: GET_SUPER_ADMINS_PENDING
});

export const getSuperAdminsSuccess = (data) => ({
  type: GET_SUPER_ADMINS_SUCCESS,
  payload: data
});

export const getSuperAdminsError = (error) => ({
  type: GET_SUPER_ADMINS_ERROR,
  payload: error
});

export const postSuperAdminPending = () => ({
  type: POST_SUPER_ADMIN_PENDING
});

export const postSuperAdminSuccess = (data) => ({
  type: POST_SUPER_ADMIN_SUCCESS,
  payload: data
});

export const postSuperAdminError = (error) => ({
  type: POST_SUPER_ADMIN_ERROR,
  payload: error
});

export const putSuperAdminPending = () => ({
  type: PUT_SUPER_ADMIN_PENDING
});

export const putSuperAdminSuccess = (data) => ({
  type: PUT_SUPER_ADMIN_SUCCESS,
  payload: data
});

export const putSuperAdminError = (error) => ({
  type: PUT_SUPER_ADMIN_ERROR,
  payload: error
});

export const deleteSuperAdminPending = () => ({
  type: DELETE_SUPER_ADMIN_PENDING
});

export const deleteSuperAdminSuccess = (data) => ({
  type: DELETE_SUPER_ADMIN_SUCCESS,
  payload: data
});

export const deleteSuperAdminError = (error) => ({
  type: DELETE_SUPER_ADMIN_ERROR,
  payload: error
});
