import { combineReducers } from 'redux';
import userReducers from './usersReducers';
import postReducer from './postReducer';

export default combineReducers({
  userReducers,
  postReducer
});
