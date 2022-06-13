import {
  GET_PROJECT_BY_ID_PENDING,
  GET_PROJECT_BY_ID_SUCCESS,
  GET_PROJECT_BY_ID_ERROR
  // SET_LOADING_FALSE
} from './constants';

const initialState = {
  project: [],
  isLoading: true,
  error: ''
};

export const projectByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECT_BY_ID_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        project: action.payload,
        isLoading: false
      };
    case GET_PROJECT_BY_ID_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    // case SET_LOADING_FALSE:
    //   return {
    //     ...state,
    //     isLoading: false
    //   };
    default:
      return state;
  }
};
