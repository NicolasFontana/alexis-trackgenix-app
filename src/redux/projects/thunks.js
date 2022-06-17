import {
  addProjectError,
  addProjectPending,
  addProjectSuccess,
  deleteProjectError,
  deleteProjectPending,
  deleteProjectSuccess,
  getProjectsError,
  getProjectsPending,
  getProjectsSuccess
} from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
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
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteProjectError(error.toString()));
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
        startDate: newProject.startDate.slice(0, 10),
        endDate: newProject.endDate.slice(0, 10),
        clientName: newProject.clientName,
        active: newProject.active === 'Active' ? true : false,
        description: newProject.description
      })
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(addProjectSuccess(response.data));
        }
        dispatch(getProjects());
        setMessage(response);
        return response.data;
      })

      .catch((error) => {
        dispatch(addProjectError(error.toString()));
        setMessage(error);
      });
  };
};
