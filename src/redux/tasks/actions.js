import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_DELETED_TASKS_PENDING,
  GET_DELETED_TASKS_SUCCESS,
  GET_DELETED_TASKS_ERROR,
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

export const getDeletedTasksError = (error) => ({
  type: GET_DELETED_TASKS_ERROR,
  payload: error
});

export const getDeletedTasksPending = () => ({
  type: GET_DELETED_TASKS_PENDING
});

export const getDeletedTasksSuccess = (data) => ({
  type: GET_DELETED_TASKS_SUCCESS,
  payload: data
});

export const getTasksError = (error) => ({
  type: GET_TASKS_ERROR,
  payload: error
});

export const addTaskPending = () => ({
  type: ADD_TASK_PENDING
});

export const addTaskSuccess = (data) => ({
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

export const editTaskSuccess = (data) => ({
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

export const deleteTaskSuccess = (data) => ({
  type: DELETE_TASK_SUCCESS,
  payload: data
});

export const deleteTaskError = (error) => ({
  type: DELETE_TASK_ERROR,
  payload: error
});
