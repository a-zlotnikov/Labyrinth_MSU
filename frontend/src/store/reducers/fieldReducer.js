import {
  ADD_VALUE,
  CHANGE_VALUE,
  FULL_FIELD,
} from '../actions/actions';

const initialState = {
  field: [],
};

export default function fieldReducer(state = initialState, action) {
  switch (action.type) {
    case FULL_FIELD:
      return {
        field: action.field,
      };
    case ADD_VALUE:
      const newField = state.field.map((comp) => {
        return {
          line: comp.line.map(elem => {

            if (elem.index === action.index) {

              for (let key in elem) {
                if (key === action.change) {
                  elem[key] = !elem[key];
                } else if (key === 'index' || key === 'value') {
                  elem[key] = elem[key];
                } else {
                  elem[key] = false;
                }
              }
              return elem;
            } else {
              return elem;
            }
          }),
        };
      });
      return {
        field: newField,
      };

    case CHANGE_VALUE:
      const newValue = state.field.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.index === action.index) {

              for (let key in elem) {
                if (key === 'value') {
                  elem[key] = action.changedValue;
                } else {
                  elem[key] = elem[key];
                }
              }
              return elem;
            } else {
              return elem;
            }
          }),
        };
      });
      return {
        field: newValue,
      };

    default:
      return state;
  }
}
