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
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};

export const addAdmin = (newAdmin, setResponse) => {
  return (dispatch) => {
    dispatch(addAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      method: 'POST',
      body: newAdmin,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(addAdminSucces(response.data));
        }
        setResponse(response);
      })
      .catch((error) => {
        dispatch(addAdminError(error.toString()));
        setResponse(error);
      });
  };
};

export const editAdmin = (id, admin, setResponse) => {
  return (dispatch) => {
    dispatch(editAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'PUT',
      body: admin,
      headers: {
        'content-type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(editAdminSucces(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(editAdminError(error.toString()));
        setResponse(error);
      });
  };
};

export const delAdmin = (id, setResponse) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteAdminSucces(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(deleteAdminError(error.toString()));
        setResponse(error);
      });
  };
};
