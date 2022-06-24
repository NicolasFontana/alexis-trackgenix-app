import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { timesheetsReducer } from './time-sheets/reducer';
import { adminsReducer } from './admins/reducer';
import { projectsReducer } from './projects/reducer';
import { employeesReducer } from './employees/reducer';
import { tasksReducer } from './tasks/reducer';
import { superAdminsReducer } from './super-admins/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  employees: employeesReducer,
  tasks: tasksReducer,
  timesheets: timesheetsReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
