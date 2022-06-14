import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  createEmployeesPending,
  createEmployeesSuccess,
  createEmployeesError,
  updateEmployeesPending,
  updateEmployeesSuccess,
  updateEmployeesError,
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

export const createEmployee = (employeeInput) => {
  return (dispatch) => {
    dispatch(createEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        phone: employeeInput.phone,
        email: employeeInput.email,
        password: employeeInput.password,
        active: employeeInput.active === 'Active' ? true : false,
        isProjectManager: employeeInput.isProjectManager === 'Yes' ? true : false,
        projects:
          employeeInput.projects.length === 0
            ? []
            : employeeInput.projects.toString().replace(/\s+/g, '').split(','),
        timeSheets:
          employeeInput.timeSheets.length === 0
            ? []
            : employeeInput.timeSheets.toString().replace(/\s+/g, '').split(',')
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(createEmployeesSuccess(response.data));
        dispatch(getEmployees());
        return response.data;
      })
      .catch((error) => {
        dispatch(createEmployeesError(error.toString()));
      });
  };
};

export const updateEmployee = (employeeInput, id) => {
  return (dispatch) => {
    dispatch(updateEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: employeeInput.firstName,
        lastName: employeeInput.lastName,
        phone: employeeInput.phone,
        email: employeeInput.email,
        password: employeeInput.password,
        active: employeeInput.active === 'Active' ? true : false,
        isProjectManager: employeeInput.isProjectManager === 'Yes' ? true : false,
        projects:
          employeeInput.projects.length === 0
            ? []
            : employeeInput.projects.toString().replace(/\s+/g, '').split(','),
        timeSheets:
          employeeInput.timeSheets.length === 0
            ? []
            : employeeInput.timeSheets.toString().replace(/\s+/g, '').split(',')
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(updateEmployeesSuccess(response.data));
        // dispatch(getEmployees());
        return response.data;
      })
      .catch((error) => {
        dispatch(updateEmployeesError(error.toString()));
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
