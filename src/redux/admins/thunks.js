import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  addAdminPending,
  addAdminSucces,
  addAdminError,
  editAdminPending,
  editAdminSucces,
  editAdminError,
  deleteAdminPending,
  deleteAdminSucces,
  deleteAdminError
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};

export const addAdmin = (adminInput, setResponse) => {
  return (dispatch) => {
    dispatch(addAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/`, {
      method: 'POST',
      body: JSON.stringify({
        firstName: adminInput.firstName,
        lastName: adminInput.lastName,
        email: adminInput.email,
        password: adminInput.password,
        active: adminInput.active === true
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(addAdminSucces(response.data));
        }
        dispatch(getAdmins());
        setResponse(response);
        return response.data;
      })
      .catch((error) => {
        dispatch(addAdminError(error.toString()));
        setResponse(error);
      });
  };
};

export const editAdmin = (admin, _id, setResponse) => {
  return (dispatch) => {
    dispatch(editAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/${_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        password: admin.password,
        active: admin.active === 'Active' ? true : false
      }),
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(editAdminSucces(response.data));
        dispatch(getAdmins());
        setResponse(response);
        return response.data;
      })
      .catch((error) => {
        dispatch(editAdminError(error.toString()));
        setResponse(error);
      });
  };
};

export const delAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteAdminSucces(response.data));
        dispatch(getAdmins());
        return response.data;
      })
      .catch((error) => {
        dispatch(deleteAdminError(error.toString()));
      });
  };
};
