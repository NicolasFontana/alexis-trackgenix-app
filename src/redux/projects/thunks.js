import { getProjectByIdPending, getProjectByIdSuccess, getProjectByIdError } from './actions';

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
