import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMIN_BY_ID_PENDIGN,
  GET_ADMIN_BY_ID_SUCCESS,
  GET_ADMIN_BY_ID_ERROR,
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

export const getAdminByIdPending = () => ({
  type: GET_ADMIN_BY_ID_PENDIGN
});

export const getAdminByIdSucces = (id) => ({
  type: GET_ADMIN_BY_ID_SUCCESS,
  payload: id
});

export const getAdminByIdError = (error) => ({
  type: GET_ADMIN_BY_ID_ERROR,
  payload: error
});

export const addAdminPending = () => ({
  type: ADD_ADMIN_PENDING
});

export const addAdminSucces = (data) => ({
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

export const editAdminSucces = (data) => ({
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

export const deleteAdminSucces = (data) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: data
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
  payload: error
});
