import {
  CHANGE_COMP,
  DELETE_ACTION,
  EXP_FIELD,
  KEYBOARD_ACTION,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  NEW_VALUE,
  START_POS,
} from '../actions/actions';

const initialState = {
  expField: {},
  moves: [],
};

export default function expReducer(state = initialState, action) {
  switch (action.type) {
    case EXP_FIELD:
      return {
        expField: action.field,
      };

    case CHANGE_COMP:
      const newExpField = state.expField;
      const newLine = newExpField.field.line.map((comp) => {
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
      newExpField.field.line = newLine;

      return {
        expField: newExpField,
      };

    case NEW_VALUE:
      const field = state.expField;
      const newValue = state.expField.field.line.map((comp) => {
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
      field.field.line = newValue;
      return {
        expField: field,
      };

    case START_POS:
      const stateField = state.expField;
      const startPos = stateField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.start === true && elem.index !== action.index) {
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
      stateField.field.line = startPos;
      return {
        expField: stateField,
      };

    case MOVE_UP:
      const currentSec = action.time;
      const expUpField = state.expField;
      let prevMovesUp = expUpField.moves;
      let prevIndex;
      let newIndex;
      let walls = [];
      let entry = [];
      expUpField.field.line.map((comp) => {
        line: comp.line.map(elem => {
          if (elem.wall) {
            walls.push(elem.index);
          } else if (elem.entry) {
            entry.push(elem.index);
          }
        });
      });

      expUpField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {

            if (elem.start === true) {
              let newIndexArray = elem.index.split('');
              let letter = newIndexArray[0];
              newIndexArray.splice(0, 1);
              let prevIndexNum = Number(newIndexArray.join(''));
              let newIndexNum = Number(newIndexArray.join('')) - 1;
              if (newIndexNum === 0 ||
                  walls.indexOf(`${letter}${newIndexNum}`) !== -1 ||
                  entry.indexOf(`${letter}${newIndexNum}`) !== -1) {

                newIndex = `${letter}${prevIndexNum}`;
              } else {
                newIndex = `${letter}${newIndexNum}`;
              }
              prevIndex = `${letter}${prevIndexNum}`;
            }
          }),
        };
      });

      const moveUp = state.expField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.index === newIndex) {
              if (elem.value && prevMovesUp && prevIndex !== newIndex) {
                let obj = {};
                obj[currentSec] = elem.value;
                prevMovesUp.push(obj);
              } else if (elem.value && !prevMovesUp && prevIndex !== newIndex) {
                let obj = {};
                obj[action.time] = elem.value;
                prevMovesUp = [obj];
              }
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = true;
                } else {
                  elem[key] = elem[key];
                }
              }
              return elem;

            } else if (elem.index === prevIndex) {
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = false;
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
      expUpField.field.line = moveUp;
      expUpField.moves = prevMovesUp;
      return {
        expField: expUpField,
      };

    case MOVE_DOWN:
      const expDownField = state.expField;
      let prevMovesDown = expDownField.moves;
      let prevIndexDown;
      let newIndexDown;
      let wallsDown = [];
      let exit = [];
      expDownField.field.line.map((comp) => {
        line: comp.line.map(elem => {
          if (elem.wall) {
            wallsDown.push(elem.index);
          } else if (elem.exit) {
            exit.push(elem.index);
          }
        });
      });
      expDownField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.start === true) {
              let newIndexArray = elem.index.split('');
              let letter = newIndexArray[0];
              newIndexArray.splice(0, 1);
              let prevIndexNum = Number(newIndexArray.join(''));
              let newIndexNum = Number(newIndexArray.join('')) + 1;

              if (newIndexNum > 11 ||
                  wallsDown.indexOf(`${letter}${newIndexNum}`) !== -1 ||
                  exit.indexOf(`${letter}${newIndexNum}`) !== -1) {
                newIndexDown = `${letter}${prevIndexNum}`;
              } else {
                newIndexDown = `${letter}${newIndexNum}`;
              }
              prevIndexDown = `${letter}${prevIndexNum}`;
            }
          }),
        };
      });

      const moveDown = state.expField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.index === newIndexDown) {
              if (elem.value && prevMovesDown && prevIndexDown !==
                  newIndexDown) {
                let obj = {};
                obj[action.time] = elem.value;
                prevMovesDown.push(obj);
              } else if (elem.value && !prevMovesDown && prevIndexDown !==
                  newIndexDown) {
                let obj = {};
                obj[action.time] = elem.value;
                prevMovesDown = [obj];
              }

              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = true;
                } else {
                  elem[key] = elem[key];
                }
              }
              return elem;

            } else if (elem.index === prevIndexDown) {
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = false;
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
      expDownField.field.line = moveDown;
      expDownField.moves = prevMovesDown;
      return {
        expField: expDownField,
      };

    case MOVE_RIGHT:
      const expRightField = state.expField;
      let prevMovesRight = expRightField.moves;

      let prevLetRight;
      let newLetRight;
      let wallsRight = [];
      expRightField.field.line.map((comp) => {
        line: comp.line.map(elem => {
          if (elem.wall) {
            wallsRight.push(elem.index);
          }
        });
      });
      expRightField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.start === true) {
              let newIndexArray = elem.index.split('');
              let prevLetter = newIndexArray[0];
              let newLet = String.fromCharCode(prevLetter.charCodeAt(0) + 1);
              newIndexArray.splice(0, 1);
              let number = newIndexArray.join('');
              prevLetRight = elem.index;

              if (prevLetter === 'k' ||
                  wallsRight.indexOf(`${newLet}${number}`) !== -1) {
                newLetRight = elem.index;
              } else {
                newLetRight = `${newLet}${number}`;
              }

            }
          }),
        };
      });

      const moveRight = state.expField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.index === newLetRight) {
              if (elem.value && prevMovesRight && prevLetRight !==
                  newLetRight) {
                let obj = {};
                obj[action.time] = elem.value;
                prevMovesRight.push(obj);
              } else if (elem.value && !prevMovesRight && prevLetRight !==
                  newLetRight) {
                let obj = {};
                obj[action.time] = elem.value;
                prevMovesRight = [obj];
              }
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = true;
                } else {
                  elem[key] = elem[key];
                }
              }
              return elem;

            } else if (elem.index === prevLetRight) {
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = false;
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
      expRightField.field.line = moveRight;
      expRightField.moves = prevMovesRight;

      return {
        expField: expRightField,
      };

    case MOVE_LEFT:
      const expLeftField = state.expField;
      let prevMovesLeft = state.expField.moves;
      let prevLetLeft;
      let newLetLeft;
      let wallsLeft = [];
      expLeftField.field.line.map((comp) => {
        line: comp.line.map(elem => {
          if (elem.wall) {
            wallsLeft.push(elem.index);
          }
        });
      });
      expLeftField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.start === true) {
              let newIndexArray = elem.index.split('');
              let prevLetter = newIndexArray[0];
              let newLet = String.fromCharCode(prevLetter.charCodeAt(0) - 1);
              newIndexArray.splice(0, 1);
              let number = newIndexArray.join('');
              prevLetLeft = elem.index;

              if (prevLetter === 'a' ||
                  wallsLeft.indexOf(`${newLet}${number}`) !== -1) {
                newLetLeft = elem.index;
              } else {
                newLetLeft = `${newLet}${number}`;
              }
            }
          }),
        };
      });

      const moveLeft = state.expField.field.line.map((comp) => {
        return {
          line: comp.line.map(elem => {
            if (elem.index === newLetLeft) {
              if (elem.value && prevMovesLeft && prevLetLeft !== newLetLeft) {
                let obj = {};
                obj[action.time] = elem.value;
                prevMovesLeft.push(obj);
              } else if (elem.value && !prevMovesLeft && prevLetLeft !==
                  newLetLeft) {
                let obj = {};
                obj[action.time] = elem.value;
                prevMovesLeft = [obj];
              }
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = true;
                } else {
                  elem[key] = elem[key];
                }
              }
              return elem;

            } else if (elem.index === prevLetLeft) {
              for (let key in elem) {
                if (key === 'start') {
                  elem[key] = false;
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
      expLeftField.field.line = moveLeft;
      expLeftField.moves = prevMovesLeft;
      return {
        expField: expLeftField,
      };

    case KEYBOARD_ACTION:
      const expKeyField = state.expField;
      let prevMovesKey = state.expField.moves;
      if (prevMovesKey) {
        let obj = {};
        obj[action.time] = action.value;
        prevMovesKey.push(obj);
      } else if (!prevMovesKey) {
        let obj = {};
        obj[action.time] = action.value;
        prevMovesKey = [obj];
      }
      expKeyField.moves = prevMovesKey;
      return {
        expField: expKeyField
      };
    case DELETE_ACTION:
      const expDeleteKeyField = state.expField;
      let prevMovesDelete = state.expField.moves;

      if (prevMovesDelete) {
        prevMovesDelete.pop();
      }
      expDeleteKeyField.moves = prevMovesDelete;
      return {
        expField: expDeleteKeyField
      };

    default:
      return state;
  }

}

