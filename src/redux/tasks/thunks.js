import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  addTaskPending,
  addTaskSuccess,
  addTaskError,
  editTaskPending,
  editTaskSuccess,
  editTaskError,
  deleteTaskPending,
  deleteTaskSuccess,
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

export const addTask = (task, setMessage) => {
  return (dispatch) => {
    dispatch(addTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(addTaskSuccess(response.data));
        }
        setMessage(response);
      })
      .catch((error) => {
        dispatch(addTaskError(error.toString()));
        setMessage(error);
      });
  };
};

export const editTask = (task, id, setMessage) => {
  return (dispatch) => {
    dispatch(editTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(editTaskSuccess(response.data));
        setMessage(response);
      })
      .catch((error) => {
        dispatch(editTaskError(error.toString()));
        setMessage(error);
      });
  };
};

export const delTask = (id, setMessage) => {
  return (dispatch) => {
    dispatch(deleteTaskPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/tasks/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteTaskSuccess(id));
        setMessage(response);
      })
      .catch((error) => {
        dispatch(deleteTaskError(error.toString()));
        setMessage(error);
      });
  };
};
