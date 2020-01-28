// <<<<<<< HEAD
import {
  FULL_FIELD,
  ADD_VALUE,
  CHANGE_VALUE,
  EXP_FIELD,
  CHANGE_COMP,
  NEW_VALUE,
  START_POS,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/actions';
// =======
// import {FULL_FIELD, ADD_VALUE, CHANGE_VALUE, EXP_FIELD, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/actions';
// >>>>>>> d8cc8ea847f544145383d3c2bac0b8a90340087c

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

export const CHANGECOMP = (index, newComp) => {
  return {
    type: CHANGE_COMP,
    index,
    newComp
  }
};

export const NEWVALUE = (index, newValue) => {
  return {
    type: NEW_VALUE,
    index,
    newValue
  };
};

export const STARTPOS = (index) => {
  return {
    type: START_POS,
    index
  }
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
