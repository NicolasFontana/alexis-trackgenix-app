import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { employeesReducer } from './employees/reducer';
import { projectReducer } from './projects/reducer';
import { tasksReducer } from './tasks/reducer';

const rootReducer = combineReducers({
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
