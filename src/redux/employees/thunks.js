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

export const createEmployee = (userInput, setResponse) => {
  return (dispatch) => {
    dispatch(createEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        phone: userInput.phone,
        email: userInput.email,
        password: userInput.password,
        active: userInput.active === 'Active' ? true : false,
        isProjectManager: userInput.isProjectManager === 'Yes' ? true : false,
        projects:
          userInput.projects.length === 0
            ? []
            : userInput.projects.toString().replace(/\s+/g, '').split(','),
        timeSheets:
          userInput.timeSheets.length === 0
            ? []
            : userInput.timeSheets.toString().replace(/\s+/g, '').split(',')
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(createEmployeesSuccess(response.data));
        }
        dispatch(getEmployees());
        setResponse(response);
        return response.data;
      })
      .catch((error) => {
        dispatch(createEmployeesError(error.toString()));
        setResponse(error);
      });
  };
};

export const updateEmployee = (userInput, id, setResponse) => {
  return (dispatch) => {
    dispatch(updateEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        phone: userInput.phone,
        email: userInput.email,
        password: userInput.password,
        active: userInput.active === 'Active' ? true : false,
        isProjectManager: userInput.isProjectManager === 'Yes' ? true : false,
        projects:
          userInput.projects.length === 0
            ? []
            : userInput.projects.toString().replace(/\s+/g, '').split(','),
        timeSheets:
          userInput.timeSheets.length === 0
            ? []
            : userInput.timeSheets.toString().replace(/\s+/g, '').split(',')
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(updateEmployeesSuccess(response.data));
        dispatch(getEmployees());
        setResponse(response);
        return response.data;
      })
      .catch((error) => {
        dispatch(updateEmployeesError(error.toString()));
        setResponse(error);
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
