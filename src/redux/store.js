import { composeWithDevTools } from 'redux-devtools-extension';
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { projectByIdReducer } from './projects/reducer';

const rootReducer = combineReducers({
  projectById: projectByIdReducer
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
