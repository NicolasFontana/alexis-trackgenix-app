import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { adminsReducer } from './admins/reducer';
import { employeesReducer } from './employees/reducer';
import { projectReducer } from './projects/reducer';
import { tasksReducer } from './tasks/reducer';

const rootReducer = combineReducers({
  admins: adminsReducer,
  employees: employeesReducer,
  tasks: tasksReducer,
  projects: projectReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
