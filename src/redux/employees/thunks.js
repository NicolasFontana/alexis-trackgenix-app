import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  deleteEmployeesPending,
  deleteEmployeesSuccess,
  deleteEmployeesError
} from './actions';

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

export const deleteEmployee = (id) => {
  return (dispatch) => {
    dispatch(deleteEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteEmployeesSuccess(response.data));
        dispatch(getEmployees());
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteEmployeesError(error.toString()));
      });
  };
};
