import 'isomorphic-fetch';
import { FETCH_CHEFS } from './types';

export const getChefList = () => (dispatch) => {
  fetch('/api/chef/all')
    .then(res => res.json())
    .then(chefs => dispatch({
      type: FETCH_CHEFS,
      payload: chefs,
    }));
};
