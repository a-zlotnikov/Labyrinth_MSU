import {ADD_VALUE, FULL_FIELD, CHANGE_VALUE} from '../actions/actions';

const initialState = {
  field: [],
};

export const fieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case FULL_FIELD:

      return {
        field: action.field,
      };
    case ADD_VALUE:
      const newField = state.field.map((comp) => {
        return {line: comp.line.map(elem => {
          if (elem.value === action.value) {

            switch (action.change) {
              case 'wall':
                return elem = {
                  value: elem.value,
                  wall: !elem.wall,
                  food: elem.food,
                  start: elem.start,
                };
              case 'food':
                return elem = {
                  value: elem.value,
                  wall: elem.wall,
                  food: !elem.food,
                  start: elem.start,
                };
              case 'start':
                return elem = {
                  value: elem.value,
                  wall: elem.wall,
                  food: elem.food,
                  start: !elem.start,
                };
              default:
                return elem = {
                  value: elem.value,
                  wall: elem.wall,
                  food: elem.food,
                  start: elem.start,
                };
            }

          } else {
            return elem;
          }
        })};
      });
      return {
        field: newField,
      };

    case CHANGE_VALUE:
      const newValue = state.field.map((comp) => {
        return {line: comp.line.map(elem => {
            if (elem.value === action.value) {
                  return elem = {
                    value: action.changedValue,
                    wall: elem.wall,
                    food: elem.food,
                    start: elem.start,
                  };
            } else {
              return elem;
            }
          })};
      });
      return {
        field: newValue,
      };

    default:
      return state;
  }
}
