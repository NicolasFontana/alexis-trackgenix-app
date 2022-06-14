import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  getTaskByIdPending,
  getTaskByIdSucces,
  getTaskByIdError,
  addTaskPending,
  addTaskSucces,
  addTaskError,
  editTaskPending,
  editTaskSucces,
  editTaskError,
  deleteTaskPending,
  deleteTaskSucces,
  deleteTaskError
} from './actions';

export const getTasks = () => {
  return (dispatch) => {
    dispatch(getTasksPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTasksSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getTasksError(error.toString()));
      });
  };
};

export const getTaskById = (id) => {
  return (dispatch) => {
    dispatch(getTaskByIdPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`)
      .then((response) => response.JSON())
      .then((response) => {
        dispatch(getTaskByIdSucces(response.data));
      })
      .catch((error) => {
        dispatch(getTaskByIdError(error.toString()));
      });
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    dispatch(addTaskPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      dispatch(addTaskSucces(data.data));
    } catch (error) {
      dispatch(addTaskError(error.toString()));
    }
  };
};

export const editTask = (task, id) => {
  return async (dispatch) => {
    dispatch(editTaskPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(task)
      });
      const data = await response.json();
      console.log(data);
      dispatch(editTaskSucces(data.data));
    } catch (error) {
      dispatch(editTaskError());
    }
  };
};

export const delTask = (id) => {
  return async (dispatch) => {
    dispatch(deleteTaskPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteTaskSucces(id));
    } catch (error) {
      dispatch(deleteTaskError(error.toString()));
    }
  };
};
