import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getDeletedAdminsPending,
  getDeletedAdminsSuccess,
  getDeletedAdminsError,
  addAdminPending,
  addAdminSuccess,
  addAdminError,
  editAdminPending,
  editAdminSuccess,
  editAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  deleteAdminError,
  restoreAdminPending,
  restoreAdminSuccess,
  restoreAdminError,
  removeAdminPending,
  removeAdminSuccess,
  removeAdminError
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAdminsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};

export const getDeletedAdmins = () => {
  return (dispatch) => {
    dispatch(getDeletedAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/deleted`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getDeletedAdminsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getDeletedAdminsError(error.toString()));
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
        'content-type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(addAdminSuccess(response.data));
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
        'content-type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(editAdminSuccess(response.data));
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
      method: 'DELETE',
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteAdminSuccess(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(deleteAdminError(error.toString()));
        setResponse(error);
      });
  };
};

export const restoreAdmin = (id, setResponse) => {
  return (dispatch) => {
    dispatch(restoreAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/restore/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(restoreAdminSuccess(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(restoreAdminError(error.toString()));
        setResponse(error);
      });
  };
};

export const removeAdmin = (id, setResponse) => {
  return (dispatch) => {
    dispatch(removeAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/remove/${id}`, {
      method: 'DELETE',
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(removeAdminSuccess(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(removeAdminError(error.toString()));
        setResponse(error);
      });
  };
};
