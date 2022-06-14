import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError
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

export const postSuperAdmins = (newSuperAdmin) => {
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
      dispatch(postSuperAdminsSuccess(data.data));
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
      return data.data;
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.toString()));
    }
  };
};
