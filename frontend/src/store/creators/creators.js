import {FULL_FIELD, ADD_VALUE, CHANGE_VALUE, EXP_FIELD, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/actions';

export const FULLFIELD = (field) => {
  return {
    type: FULL_FIELD,
    field,
  };
};

export const ADDVALUE = (index, change) => {
  return {
    type: ADD_VALUE,
    index,
    change,
  };
};

export const CHANGEVALUE = (index, changedValue) => {
  return {
    type: CHANGE_VALUE,
    index,
    changedValue,
  };
};

export const EXPFIELD = (field) => {
  return {
    type: EXP_FIELD,
    field,
  };
};

export const fetchField = () => {
  return async (dispatch) => {
    const response = await fetch('/getField');
    const result = await response.json();
    dispatch(FULLFIELD(result));
  };
};

export const expField = (id) => {
  return async (dispatch) => {
    const response = await fetch(
        '/getExpField',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id
          }),
        }
    );
    const result = await response.json();

    dispatch(EXPFIELD(result));
  };
};

export const AUTHSUCCESS = (token) => {
  return {
    type: AUTH_SUCCESS,
    token,
  };
};
