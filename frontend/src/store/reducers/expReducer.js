import {EXP_FIELD} from '../actions/actions';

const initialState = {
  expField: {}
};

export default function expReducer(state = initialState, action) {
  switch (action.type) {
    case EXP_FIELD:
      return {
        expField: action.field
      };

    default:
      return state
  }

}

