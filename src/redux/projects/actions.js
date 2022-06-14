import {
  GET_PROJECT_BY_ID_PENDING,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_ERROR,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR
} from './constants';

export const getProjectByIdPending = () => {
  return {
    type: GET_PROJECT_BY_ID_PENDING
  };
};
export const getProjectByIdSuccess = (data) => {
  return {
    type: GET_PROJECT_BY_ID_SUCCESS,
    payload: data
  };
};
export const getProjectByIdError = (error) => {
  return {
    type: GET_PROJECT_BY_ID_ERROR,
    payload: error
  };
};
export const updateProjectPending = () => {
  return {
    type: UPDATE_PROJECT_PENDING
  };
};
export const updateProjectSuccess = (data) => {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: data
  };
};
export const updateProjectError = (error) => {
  return {
    type: UPDATE_PROJECT_ERROR,
    payload: error
  };
};
