import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getAdminByIdPending,
  getAdminByIdSucces,
  getAdminByIdError,
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

export const getAdminById = (id) => {
  return (dispatch) => {
    dispatch(getAdminByIdPending());
    return fetch(`${process.env.REACT_APP_API_URL}/api/admins/id/${id}`)
      .then((response) => response.JSON())
      .then((response) => {
        dispatch(getAdminByIdSucces(response.data));
      })
      .catch((error) => {
        dispatch(getAdminByIdError(error.toString()));
      });
  };
};

export const addAdmin = (admins) => {
  return async (dispatch) => {
    dispatch(addAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(admins)
      });
      const data = await response.json();
      dispatch(addAdminSucces(data.data));
    } catch (error) {
      dispatch(addAdminError(error.toString()));
    }
  };
};

export const editAdmin = (admin, id) => {
  return async (dispatch) => {
    dispatch(editAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/id/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(admin)
      });
      const data = await response.json();
      console.log(data);
      dispatch(editAdminSucces(data.data));
    } catch (error) {
      dispatch(editAdminError());
    }
  };
};

export const delAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/tasks/id/${id}`, {
        method: 'DELETE'
      });
      dispatch(deleteAdminSucces(id));
    } catch (error) {
      dispatch(deleteAdminError(error.toString()));
    }
  };
};
