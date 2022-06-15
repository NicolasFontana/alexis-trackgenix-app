import { getEmployeesPending, getEmployeesSuccess, getEmployeesError } from './actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getEmployeesError(error.toString()));
      });
  };
};
