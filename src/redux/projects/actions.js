import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_PROJECT_BY_ID_PENDING,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_ERROR,
  UPDATE_PROJECT_PENDING,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR
} from './constants';

export const getProjectsPending = () => ({
  type: GET_PROJECTS_PENDING
});

export const getProjectsSuccess = (projects) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: projects
});

export const getProjectsError = (error) => ({
  type: GET_PROJECTS_ERROR,
  payload: error
});

export const getProjectByIdPending = () => ({
  type: GET_PROJECT_BY_ID_PENDING
});

export const getProjectByIdSuccess = (projects) => ({
  type: GET_PROJECT_BY_ID_SUCCESS,
  payload: projects
});

export const getProjectByIdError = (error) => ({
  type: GET_PROJECT_BY_ID_ERROR,
  payload: error
});

export const addProjectPending = () => ({
  type: ADD_PROJECT_PENDING
});

export const addProjectSuccess = (projects) => ({
  type: ADD_PROJECT_SUCCESS,
  payload: projects
});

export const addProjectError = (error) => ({
  type: ADD_PROJECT_ERROR,
  payload: error
});

export const updateProjectPending = () => ({
  type: UPDATE_PROJECT_PENDING
});

export const updateProjectSuccess = (projects) => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: projects
});

export const updateProjectError = (error) => ({
  type: UPDATE_PROJECT_ERROR,
  payload: error
});

export const deleteProjectPending = () => ({
  type: DELETE_PROJECT_PENDING
});

export const deleteProjectSuccess = (projectsId) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: projectsId
});

export const deleteProjectError = (error) => ({
  type: DELETE_PROJECT_ERROR,
  payload: error
});
