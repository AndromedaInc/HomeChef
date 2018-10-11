import { combineReducers } from 'redux';
import chefReducer from './chefReducer';

export default combineReducers({
  chefs: chefReducer,
});
