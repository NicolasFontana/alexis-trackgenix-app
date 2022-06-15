import {
  getProjectByIdPending,
  getProjectByIdSuccess,
  getProjectByIdError,
  updateProjectPending,
  updateProjectSuccess,
  updateProjectError
} from './actions';

export const getProjectById = (id, setUserInput) => {
  return (dispatch) => {
    dispatch(getProjectByIdPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects/${id}`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectByIdSuccess(response.data));
        setUserInput(response.data);
        return response.data;
      })
      .catch((error) => {
        dispatch(getProjectByIdError(error.toString()));
      });
  };
};

export const updateProject = (id, body, setAlertMessage) => {
  return async (dispatch) => {
    dispatch(updateProjectPending());
    let url = `${process.env.REACT_APP_API_URL}/api/projects/${id}`;
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };
    return fetch(url, options)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201 && response.status !== 204) {
          return response.json();
        }
        return response.json();
      })
      .then((response) => {
        // console.log(response);
        dispatch(updateProjectSuccess());
        setAlertMessage(response);
        dispatch(getProjectById(id));
        return response;
      })
      .catch((error) => {
        dispatch(updateProjectError(error.toString()));
        setAlertMessage(error);
      });
  };
};
