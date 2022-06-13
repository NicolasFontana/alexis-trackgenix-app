import {
  getProjectByIdPending,
  getProjectByIdSuccess,
  getProjectByIdError
  // setLoading
} from './actions';

export const getProjectById = (id) => {
  return (dispatch) => {
    dispatch(getProjectByIdPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/projects/${id}`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectByIdSuccess(response.data));
        // dispatch(setLoading());
        return response.data;
      })
      .catch((error) => {
        dispatch(getProjectByIdError(error.toString()));
        // dispatch(setLoading());
      });
  };
};
