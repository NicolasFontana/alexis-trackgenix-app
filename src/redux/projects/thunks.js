import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  getProjectByIdPending,
  getProjectByIdSuccess,
  getProjectByIdError,
  updateProjectPending,
  updateProjectSuccess,
  updateProjectError,
  addProjectPending,
  addProjectSuccess,
  addProjectError,
  deleteProjectPending,
  deleteProjectSuccess,
  deleteProjectError
} from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

export const getProjectById = (id, setUserInput) => {
  return (dispatch) => {
    dispatch(getProjectByIdPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects/${id}`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectByIdSuccess(response.data));
        setUserInput(response.data);
      })
      .catch((error) => {
        dispatch(getProjectByIdError(error.toString()));
      });
  };
};

export const addProject = (newProject, setMessage) => {
  return (dispatch) => {
    dispatch(addProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: newProject.name,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        clientName: newProject.clientName,
        active: newProject.active,
        description: newProject.description
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(addProjectSuccess(response.data));
        }
        setMessage(response);
      })
      .catch((error) => {
        dispatch(addProjectError(error.toString()));
        setMessage(error);
      });
  };
};

export const updateProject = (id, body, setAlertMessage) => {
  return async (dispatch) => {
    dispatch(updateProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(updateProjectSuccess(id));
        setAlertMessage(response);
      })
      .catch((error) => {
        dispatch(updateProjectError(error.toString()));
        setAlertMessage(error);
      });
  };
};

export const deleteProject = (_id, setMessage) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects/${_id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteProjectSuccess(_id));
        setMessage(response);
      })
      .catch((error) => {
        dispatch(deleteProjectError(error.toString()));
      });
  };
};
