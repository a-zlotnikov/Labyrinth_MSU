import {ADD_VALUE, FULL_FIELD, CHANGE_VALUE} from '../actions/actions';

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
        return {line: comp.line.map(elem => {
          if (elem.index === action.index) {

            switch (action.change) {
              case 'wall':
                return elem = {
                  index: elem.index,
                  wall: !elem.wall,
                  food: elem.food,
                  start: elem.start,
                  value: elem.value,
                };
              case 'food':
                return elem = {
                  index: elem.index,
                  wall: elem.wall,
                  food: !elem.food,
                  start: elem.start,
                  value: elem.value
                };
              case 'start':
                return elem = {
                  index: elem.index,
                  wall: elem.wall,
                  food: elem.food,
                  start: !elem.start,
                  value: elem.value,
                };
              default:
                return elem = {
                  index: elem.index,
                  wall: elem.wall,
                  food: elem.food,
                  start: elem.start,
                  value: elem.value,
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
            if (elem.index === action.index) {
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
