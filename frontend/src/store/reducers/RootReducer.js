import { combineReducers } from 'redux';
import authReducer from './authReducer';
import fieldReducer from './fieldReducer'
import expReducer from './expReducer';

export default combineReducers({
  auth: authReducer,
  field: fieldReducer,
  expField: expReducer
});

