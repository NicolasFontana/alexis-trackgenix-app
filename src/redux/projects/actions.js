import {
  GET_PROJECT_BY_ID_PENDING,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_ERROR
  // SET_LOADING_FALSE
} from './constants';

export const getProjectByIdPending = () => {
  return {
    type: GET_PROJECT_BY_ID_PENDING
  };
};
export const getProjectByIdSuccess = (data) => {
  return {
    type: GET_PROJECT_BY_ID_SUCCESS,
    payload: data
  };
};
export const getProjectByIdError = (error) => {
  return {
    type: GET_PROJECT_BY_ID_ERROR,
    payload: error
  };
};
// export const setLoading = () => {
//   return {
//     type: SET_LOADING_FALSE
//   };
// };
