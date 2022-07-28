import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  getDeletedEmployeesPending,
  getDeletedEmployeesSuccess,
  getDeletedEmployeesError,
  createEmployeePending,
  createEmployeeSuccess,
  createEmployeeError,
  updateEmployeePending,
  updateEmployeeSuccess,
  updateEmployeeError,
  deleteEmployeePending,
  deleteEmployeeSuccess,
  deleteEmployeeError
} from './actions';

export const getEmployees = () => {
  return (dispatch) => {
    dispatch(getEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getEmployeesError(error.toString()));
      });
  };
};

export const getDeletedEmployees = () => {
  return (dispatch) => {
    dispatch(getDeletedEmployeesPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/deleted`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getDeletedEmployeesSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getDeletedEmployeesError(error.toString()));
      });
  };
};

export const createEmployee = (userInput, setResponse) => {
  return (dispatch) => {
    dispatch(createEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        phone: userInput.phone,
        email: userInput.email,
        password: userInput.password,
        active: userInput.active,
        isProjectManager: userInput.isProjectManager,
        projects:
          userInput.projects.length === 0
            ? []
            : userInput.projects.toString().replace(/\s+/g, '').split(','),
        timeSheets:
          userInput.timeSheets.length === 0
            ? []
            : userInput.timeSheets.toString().replace(/\s+/g, '').split(','),
        address: '',
        picture: '',
        dni: '',
        dateBirth: ''
      }),
      headers: {
        'Content-type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          return response.json().then(({ message }) => {
            throw new Error(message);
          });
        }
        return response.json();
      })
      .then((response) => {
        if (response.error === false) {
          dispatch(createEmployeeSuccess(response.data));
        }
        setResponse(response);
      })
      .catch((error) => {
        dispatch(createEmployeeError(error.toString()));
        setResponse(error);
      });
  };
};

export const updateEmployee = (userInput, id, setResponse) => {
  return (dispatch) => {
    dispatch(updateEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
      method: 'PUT',
      body: userInput,
      headers: {
        'Content-type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(updateEmployeeSuccess(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(updateEmployeeError(error.toString()));
        setResponse(error);
      });
  };
};

export const deleteEmployee = (id, setResponse) => {
  return (dispatch) => {
    dispatch(deleteEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/employees/${id}`, {
      method: 'DELETE',
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteEmployeeSuccess(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(deleteEmployeeError(error.toString()));
        setResponse(error);
      });
  };
};
