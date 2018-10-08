import { combineReducers } from 'redux';
import postReducer from './postReducer';
import chefReducer from './chefReducer';

export default combineReducers({
  posts: postReducer,
  chefs: chefReducer,
});
