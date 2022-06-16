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

// export const addAdmin = (admins) => {
//   return async (dispatch) => {
//     dispatch(addAdminPending());
//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json'
//         },
//         body: JSON.stringify({
//           firstName: admins.firstName,
//           lastName: admins.lastName,
//           email: admins.email,
//           password: admins.password,
//           active: admins.active
//         })
//       });
//       const res = await response.json();
//       dispatch(addAdminSucces(res.data));
//       return { error: false, message: res.message };
//     } catch (error) {
//       dispatch(addAdminError(error.toString()));
//       return { error: true, message: error };
//     }
//   };
// };

export const addAdmin = (newAdmin, setResponse) => {
  return async (dispatch) => {
    dispatch(addAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins`, {
        method: 'POST',
        body: newAdmin,
        headers: {
          'content-type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.error === false) {
        dispatch(addAdminSucces(data.data));
      }
      setResponse(data);
      return data.data;
    } catch (error) {
      dispatch(addAdminError(error.toString()));
    }
  };
};

export const editAdmin = (idDelete, editedAdmin, setResponse) => {
  return async (dispatch) => {
    dispatch(editAdminPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/admins/${idDelete}`, {
        method: 'PUT',
        body: editedAdmin,
        headers: {
          'content-type': 'application/json'
        }
      });
      const data = await response.json();
      dispatch(editAdminSucces(data.data));
      dispatch(getAdmins());
      setResponse(data);
      return data.data;
    } catch (error) {
      dispatch(editAdminError(error.toString()));
    }
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
