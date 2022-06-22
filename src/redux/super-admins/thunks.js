import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError,
  putSuperAdminsPending,
  putSuperAdminsSuccess,
  putSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`);
      const data = await response.json();
      dispatch(getSuperAdminsSuccess(data.data));
      return data.data;
    } catch (error) {
      dispatch(getSuperAdminsError(error.toString()));
    }
  };
};

export const postSuperAdmins = (newSuperAdmin, setResponse) => {
  return async (dispatch) => {
    dispatch(postSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins`, {
        method: 'POST',
        body: newSuperAdmin,
        headers: {
          'content-type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.error === false) {
        dispatch(postSuperAdminsSuccess(data.data));
      }
      dispatch(getSuperAdmins());
      setResponse(data);
      return data.data;
    } catch (error) {
      dispatch(postSuperAdminsError(error.toString()));
    }
  };
};

export const deleteSuperAdmins = (_id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/super-admins/${_id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      dispatch(deleteSuperAdminsSuccess(data.data));
      dispatch(getSuperAdmins());
      return data.data;
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.toString()));
    }
  };
};

export const putSuperAdmins = (superAdminId, editedSuperAdmin, setResponse) => {
  return async (dispatch) => {
    dispatch(putSuperAdminsPending());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/super-admins/${superAdminId}`,
        {
          method: 'PUT',
          body: editedSuperAdmin,
          headers: {
            'content-type': 'application/json'
          }
        }
      );
      const data = await response.json();
      dispatch(putSuperAdminsSuccess(data.data));
      dispatch(getSuperAdmins());
      setResponse(data);
      return data.data;
    } catch (error) {
      dispatch(putSuperAdminsError(error.toString()));
    }
  };
};
