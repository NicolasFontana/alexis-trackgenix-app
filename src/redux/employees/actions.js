import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  CREATE_EMPLOYEES_PENDING,
  CREATE_EMPLOYEES_SUCCESS,
  CREATE_EMPLOYEES_ERROR,
  UPDATE_EMPLOYEES_PENDING,
  UPDATE_EMPLOYEES_SUCCESS,
  UPDATE_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const createEmployeesPending = () => {
  return {
    type: CREATE_EMPLOYEES_PENDING
  };
};

export const createEmployeesSuccess = (data) => {
  return {
    type: CREATE_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const createEmployeesError = (error) => {
  return {
    type: CREATE_EMPLOYEES_ERROR,
    payload: error
  };
};

export const updateEmployeesPending = () => {
  return {
    type: UPDATE_EMPLOYEES_PENDING
  };
};

export const updateEmployeesSuccess = (data) => {
  return {
    type: UPDATE_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const updateEmployeesError = (error) => {
  return {
    type: UPDATE_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeesPending = () => {
  return {
    type: DELETE_EMPLOYEES_PENDING
  };
};

export const deleteEmployeesSuccess = (dataId) => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS,
    payload: dataId
  };
};

export const deleteEmployeesError = (error) => {
  return {
    type: DELETE_EMPLOYEES_ERROR,
    payload: error
  };
};
