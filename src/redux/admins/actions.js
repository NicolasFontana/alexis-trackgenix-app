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
  DELETE_ADMIN_ERROR,
  RESTORE_ADMIN_PENDING,
  RESTORE_ADMIN_SUCCESS,
  RESTORE_ADMIN_ERROR,
  REMOVE_ADMIN_PENDING,
  REMOVE_ADMIN_SUCCESS,
  REMOVE_ADMIN_ERROR
} from './constants';

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsSuccess = (data) => ({
  type: GET_ADMINS_SUCCESS,
  payload: data
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const getDeletedAdminsPending = () => ({
  type: GET_DELETED_ADMINS_PENDING
});

export const getDeletedAdminsSuccess = (data) => ({
  type: GET_DELETED_ADMINS_SUCCESS,
  payload: data
});

export const getDeletedAdminsError = (error) => ({
  type: GET_DELETED_ADMINS_ERROR,
  payload: error
});

export const addAdminPending = () => ({
  type: ADD_ADMIN_PENDING
});

export const addAdminSuccess = (data) => ({
  type: ADD_ADMIN_SUCCESS,
  payload: data
});

export const addAdminError = (error) => ({
  type: ADD_ADMIN_ERROR,
  payload: error
});

export const editAdminPending = () => ({
  type: EDIT_ADMIN_PENDING
});

export const editAdminSuccess = (data) => ({
  type: EDIT_ADMIN_SUCCESS,
  payload: data
});

export const editAdminError = (error) => ({
  type: EDIT_ADMIN_ERROR,
  payload: error
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminSuccess = (dataId) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: dataId
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
  payload: error
});

export const restoreAdminPending = () => ({
  type: RESTORE_ADMIN_PENDING
});

export const restoreAdminSuccess = (data) => ({
  type: RESTORE_ADMIN_SUCCESS,
  payload: data
});

export const restoreAdminError = (error) => ({
  type: RESTORE_ADMIN_ERROR,
  payload: error
});

export const removeAdminPending = () => ({
  type: REMOVE_ADMIN_PENDING
});

export const removeAdminSuccess = (dataId) => ({
  type: REMOVE_ADMIN_SUCCESS,
  payload: dataId
});

export const removeAdminError = (error) => ({
  type: REMOVE_ADMIN_ERROR,
  payload: error
});
