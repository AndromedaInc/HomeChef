import 'isomorphic-fetch';
import { FETCH_CHEFS, FETCH_USER } from './types';

export const getChefList = () => (dispatch) => {
  fetch('/api/chef/all')
    .then(res => res.json())
    .then(chefs => dispatch({
      type: FETCH_CHEFS,
      payload: chefs,
    }));
};

export const getUserDetails = username => (dispatch) => {
  fetch(`/api/user/accountInfo?username=${username}`)
    .then(res => res.json())
    .then(user => dispatch({
      type: FETCH_USER,
      payload: user,
    }));
};
