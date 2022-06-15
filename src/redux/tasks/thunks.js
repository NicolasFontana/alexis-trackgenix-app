import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
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
        dispatch(addTaskSucces(response.data));
        dispatch(getTasks());
        setMessage(response);
        return response.data;
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
        dispatch(editTaskSucces(response.data));
        dispatch(getTasks());
        setMessage(response);
        return response.data;
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
        dispatch(deleteTaskSucces(id));
        dispatch(getTasks());
        setMessage(response);
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteTaskError(error.toString()));
        setMessage(error);
      });
  };
};
