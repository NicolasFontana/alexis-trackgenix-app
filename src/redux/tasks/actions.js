import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASK_BY_ID_PENDIGN,
  GET_TASK_BY_ID_SUCCESS,
  GET_TASK_BY_ID_ERROR,
  ADD_TASK_PENDING,
  ADD_TASK_SUCCESS,
  ADD_TASK_ERROR,
  EDIT_TASK_PENDING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR
} from './constants';

export const getTasksPending = () => ({
  type: GET_TASKS_PENDING
});

export const getTasksSuccess = (data) => ({
  type: GET_TASKS_SUCCESS,
  payload: data
});

export const getTasksError = (error) => ({
  type: GET_TASKS_ERROR,
  payload: error
});

export const getTaskByIdPending = () => ({
  type: GET_TASK_BY_ID_PENDIGN
});

export const getTaskByIdSucces = (id) => ({
  type: GET_TASK_BY_ID_SUCCESS,
  payload: id
});

export const getTaskByIdError = (error) => ({
  type: GET_TASK_BY_ID_ERROR,
  payload: error
});

export const addTaskPending = () => ({
  type: ADD_TASK_PENDING
});

export const addTaskSucces = (data) => ({
  type: ADD_TASK_SUCCESS,
  payload: data
});

export const addTaskError = (error) => ({
  type: ADD_TASK_ERROR,
  payload: error
});

export const editTaskPending = () => ({
  type: EDIT_TASK_PENDING
});

export const editTaskSucces = (data) => ({
  type: EDIT_TASK_SUCCESS,
  payload: data
});

export const editTaskError = (error) => ({
  type: EDIT_TASK_ERROR,
  payload: error
});

export const deleteTaskPending = () => ({
  type: DELETE_TASK_PENDING
});

export const deleteTaskSucces = (data) => ({
  type: DELETE_TASK_SUCCESS,
  payload: data
});

export const deleteTaskError = (error) => ({
  type: DELETE_TASK_ERROR,
  payload: error
});
