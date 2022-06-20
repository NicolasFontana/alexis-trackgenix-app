import {
  GET_PROJECT_ERROR,
  GET_PROJECT_PENDING,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_BY_ID_PENDING,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_ERROR,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS
} from './constants';

export const getProjectsSuccess = (projects) => ({
  type: GET_PROJECT_SUCCESS,
  payload: projects
});

export const getProjectsPending = () => ({
  type: GET_PROJECT_PENDING
});

export const getProjectsError = (error) => ({
  type: GET_PROJECT_ERROR,
  payload: error
});

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
export const updateProjectSuccess = () => {
  return {
    type: UPDATE_PROJECT_SUCCESS
  };
};
export const updateProjectError = (error) => {
  return {
    type: UPDATE_PROJECT_ERROR,
    payload: error
  };
};
export const deleteProjectSuccess = (projectsId) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: projectsId
});
export const deleteProjectPending = () => ({
  type: DELETE_PROJECT_PENDING
});
export const deleteProjectError = (error) => ({
  type: DELETE_PROJECT_ERROR,
  payload: error
});

export const addProjectSuccess = (data) => ({
  type: ADD_PROJECT_SUCCESS,
  payload: data
});
export const addProjectPending = () => ({
  type: ADD_PROJECT_PENDING
});

export const addProjectError = (error) => ({
  type: ADD_PROJECT_ERROR,
  payload: error
});
