import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  postSuperAdminPending,
  postSuperAdminSuccess,
  postSuperAdminError,
  putSuperAdminPending,
  putSuperAdminSuccess,
  putSuperAdminError,
  deleteSuperAdminPending,
  deleteSuperAdminSuccess,
  deleteSuperAdminError
} from './actions';

export const getSuperAdmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getSuperAdminsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.toString()));
      });
  };
};

export const postSuperAdmin = (newSuperAdmin, setResponse) => {
  return (dispatch) => {
    dispatch(postSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newSuperAdmin)
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.error === false) {
          dispatch(postSuperAdminSuccess(response.data));
        }
        setResponse(response);
      })
      .catch((error) => {
        dispatch(postSuperAdminError(error.toString()));
      });
  };
};

export const putSuperAdmin = (superAdminId, editedSuperAdmin, setResponse) => {
  return (dispatch) => {
    dispatch(putSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${superAdminId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(editedSuperAdmin)
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(putSuperAdminSuccess(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(putSuperAdminError(error.toString()));
      });
  };
};

export const deleteSuperAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteSuperAdminSuccess(response.data));
      })
      .catch((error) => {
        dispatch(deleteSuperAdminError(error.toString()));
      });
  };
};
