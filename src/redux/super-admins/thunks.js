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
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        dispatch(getSuperAdminsSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getSuperAdminsError(error.toString()));
      });
  };
};

export const postSuperAdmin = (newSuperAdmin, setResponse) => {
  return (dispatch) => {
    dispatch(postSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
      method: 'POST',
      body: newSuperAdmin,
      headers: {
        'content-type': 'application/json',
        token: sessionStorage.getItem('token')
      }
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
        setResponse(error);
      });
  };
};

export const putSuperAdmin = (superAdminId, editedSuperAdmin, setResponse) => {
  return (dispatch) => {
    dispatch(putSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${superAdminId}`, {
      method: 'PUT',
      body: editedSuperAdmin,
      headers: {
        'content-type': 'application/json',
        token: sessionStorage.getItem('token')
      }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(putSuperAdminSuccess(response.data));
        setResponse(response);
      })
      .catch((error) => {
        dispatch(putSuperAdminError(error.toString()));
        setResponse(error);
      });
  };
};

export const deleteSuperAdmin = (id, setMessage) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${id}`, {
      method: 'DELETE',
      headers: { token: sessionStorage.getItem('token') }
    })
      .then((response) => response.json())
      .then((response) => {
        dispatch(deleteSuperAdminSuccess(response.data));
        setMessage(response);
      })
      .catch((error) => {
        dispatch(deleteSuperAdminError(error.toString()));
        setMessage(error);
      });
  };
};
