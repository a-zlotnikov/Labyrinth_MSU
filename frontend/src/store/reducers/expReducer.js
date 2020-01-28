import {CHANGE_COMP, NEW_VALUE, EXP_FIELD, START_POS} from '../actions/actions';

const initialState = {
  expField: {}
};

export default function expReducer(state = initialState, action) {
  switch (action.type) {
    case EXP_FIELD:
      return {
        expField: action.field
      };

    case CHANGE_COMP:
      const newExpField = state.expField;
      const newLine = newExpField.env.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {

            if (elem.index === action.index) {

              for (let key in elem) {
                if (key === action.newComp) {
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
      newExpField.env.field.line = newLine;

      return {
        expField: newExpField,
      };

    case NEW_VALUE:
      const field = state.expField;
      const newValue = state.expField.env.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.index === action.index) {

              for (let key in elem) {
                if (key === 'value') {
                  elem[key] = action.newValue;
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
      field.env.field.line = newValue;
      return {
        expField: field
      };

    case START_POS:
      console.log('start');
      const stateField = state.expField;
      const startPos = stateField.env.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {

            if (elem.start === true && elem.index !== action.index){
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = !elem[key];
                } else if (key === 'index' || key === 'value') {
                  elem[key] = elem[key];
                } else {
                  elem[key] = false;
                }
              }
              return elem;

            } else if (elem.index === action.index) {

              for (let key in elem) {
                if (key === 'start') {
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
      stateField.env.field.line = startPos;
      return {
        expField: stateField,
      };

    default:
      return state
  }

}

