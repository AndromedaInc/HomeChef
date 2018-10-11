import { FETCH_CHEFS, FETCH_USER } from '../actions/types';

const initialState = {
  chefsAvailable: [],
  currentUser: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CHEFS:
      return {
        // ...state,
        chefsAvailable: action.payload,
      };
    case FETCH_USER:
      return {
        // ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
