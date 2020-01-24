import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fieldReducer from './fieldReducer'

export default combineReducers({
  auth: authReducer,
  field: fieldReducer
});

