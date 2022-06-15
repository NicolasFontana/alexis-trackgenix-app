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
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
      const res = await response.json();
      dispatch(getProjectsSuccess(res.data));
      return response.data;
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const deleteProject = (_id) => {
  return async (dispatch) => {
    dispatch(deleteProjectPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/projects/${_id}`, {
        method: 'DELETE'
      });
      dispatch(deleteProjectSuccess(_id));
    } catch (error) {
      dispatch(deleteProjectError(error.toString()));
    }
  };
};

export const addProject = (newProject) => {
  return async (dispatch) => {
    dispatch(addProjectPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`, {
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
      });
      const res = await response.json();
      if (res.error) {
        throw res.message;
      }
      dispatch(addProjectSuccess());
    } catch (error) {
      dispatch(addProjectError(error));
    }
  };
};
