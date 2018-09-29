import React from 'react';
// import UserAuth from './auth/UserAuth';
// import ChefAuth from './auth/ChefAuth';
// import ChefHome from './chefs/ChefHome';
// import UserHome from './users/UserHome';

import Loadable from 'react-loadable';
const UserAuth = () => Loadable({
    loader: () => import('./auth/UserAuth'),
    loading: () => <div>Loading...</div>,
  })
const ChefAuth = () => Loadable({
  loader: () => import('./auth/ChefAuth'),
  loading: () => <div>Loading...</div>,
})
const ChefHome = () => Loadable({
  loader: () => import('./chefs/ChefHome'),
  loading: () => <div>Loading...</div>,
})
const UserHome = () => Loadable({
  loader: () => import('./users/UserHome'),
  loading: () => <div>Loading...</div>,
})

export default [
  { path: '/', component: UserAuth(), exact: true },
  { path: '/userauth', component: UserAuth(), exact: true },
  { path: '/chefauth', component: ChefAuth(), exact: true },
  { path: '/chef', component: ChefHome(), exact: true },
  { path: '/user', component: UserHome(), exact: true },
];
