import React from 'react';
// import UserAuth from './auth/UserAuth';
// import ChefAuth from './auth/ChefAuth';
// import ChefHome from './chefs/ChefHome';
// import UserHome from './users/UserHome';

/** ** CodeSplittingHelper importing react-loadable - cannot get to work *** */
// import codeSplitter from './codeSplittingHelper';

// const helper = pathToModule => codeSplitter(() => import(pathToModule));

// const UserAuth = helper('./auth/UserAuth');

/** ** Run react-loadable in this file here - works if call UserAuth() in export default array *** */
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

// const helper = pathToModule => Loadable({
//     loader: () => import(pathToModule),
//     loading: () => <div>Loading...</div>,
//   });

// const UserAuth = () => helper('./auth/UserAuth');
// const ChefAuth = helper('./auth/ChefAuth');
// const UserHome = helper('./users/UserHome');

/** * Import LoadableHelper from fiel running loadable-components - cannot get to work** */
// import LoadableHelper from './loadableComponentsHelper';
// const UserAuth = LoadableHelper('./auth/UserAuth');

/** ** Run loadable-componnets in this file here - works until attempt to create a helper function  *** */
// import loadable from 'loadable-components'; // https://github.com/smooth-code/loadable-components
// const Loading = () => <div>Loading...</div>;
// const UserAuth = loadable(() => import(
//   './auth/UserAuth'), {
//   LoadingComponent: Loading,
// });
// const ChefAuth = loadable(() => import('./auth/ChefAuth'), {
//   LoadingComponent: Loading,
// });
// const ChefHome = loadable(() => import('./chefs/ChefHome'), {
//   LoadingComponent: Loading,
// });
// const UserHome = loadable(() => import('./users/UserHome'), {
//   LoadingComponent: Loading,
// });

/* Attempt with helper function */
// const LoadableComponent = pathToModule => loadable(() => import(pathToModule), {
//   LoadingComponent: Loading,
// });
// const UserAuth = LoadableComponent('./auth/UserAuth')
// const ChefAuth = LoadableComponent('./auth/ChefAuth')

export default [
  { path: '/', component: UserAuth(), exact: true },
  { path: '/userauth', component: UserAuth(), exact: true },
  { path: '/chefauth', component: ChefAuth(), exact: true },
  { path: '/chef', component: ChefHome(), exact: true },
  { path: '/user', component: UserHome(), exact: true },
];
