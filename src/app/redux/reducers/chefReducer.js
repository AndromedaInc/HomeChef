import { FETCH_CHEFS } from '../actions/types';

const initialState = {
  chefsAvailable: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CHEFS:
      return {
        // ...state,
        chefsAvailable: action.payload,
      };
    default:
      return state;
  }
}
