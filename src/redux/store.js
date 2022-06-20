import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { superAdminsReducer } from './super-admins/reducer';
import { employeesReducer } from './employees/reducer';
import { tasksReducer } from './tasks/reducer';

const rootReducer = combineReducers({
  superAdmins: superAdminsReducer,
  employees: employeesReducer,
  tasks: tasksReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
