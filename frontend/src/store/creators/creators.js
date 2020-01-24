import {FULL_FIELD, ADD_VALUE, CHANGE_VALUE} from '../actions/actions';

export const FULLFIELD = (field) => {
  return {
    type: FULL_FIELD,
    field,
  };
};

export const ADDVALUE = (value, change) => {
  return {
    type: ADD_VALUE,
    value,
    change,
  };
};

export const CHANGEVALUE = (value, changedValue) => {
  return {
    type: CHANGE_VALUE,
    value,
    changedValue,
  };
};

export const fetchField = () => {
  return async (dispatch) => {
    console.log(123);
    const response = await fetch('/getField');
    const result = await response.json();
    console.log(result);
    dispatch(FULLFIELD(result));
  };
};


