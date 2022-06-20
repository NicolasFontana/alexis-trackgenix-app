import {
  ADD_PROJECT_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  GET_PROJECT_ERROR,
  GET_PROJECT_PENDING,
  GET_PROJECT_SUCCESS
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
