import React from 'react';
// import UserAuth from './auth/UserAuth';
// import ChefAuth from './auth/ChefAuth';
// import ChefHome from './chefs/ChefHome';
// import UserHome from './users/UserHome';
// import ViewChefSchedule from './users/ViewChefSchedule';
// import MakeReservation from './users/MakeReservation';
// import UsersChefDetails from "./users/UsersChefDetails";
import AsyncRoute from './AsyncRoute';

/***** code to handle require.ensure error that would otherwise pop up on server (also tried babel-plugin-dynamic-import-node but could not get to work) *****/
if (typeof require.ensure !== 'function') require.ensure = (d, c) => { c(require); };
if (typeof require.include !== 'function') require.include = () => { };

/***** attempt to code split using react-loadable but commented out for now in exchange for AsynRoute.jsx approach detailed by Brian Holt in Frontend Master *****/
// import Loadable from 'react-loadable';
// const UserAuth = () => Loadable({
//     loader: () => import('./auth/UserAuth'),
//     loading: () => <div>Loading...</div>,
//   })
// const ChefAuth = () => Loadable({
//   loader: () => import('./auth/ChefAuth'),
//   loading: () => <div>Loading...</div>,
// })
// const ChefHome = () => Loadable({
//   loader: () => import('./chefs/ChefHome'),
//   loading: () => <div>Loading...</div>,
// })
// const UserHome = () => Loadable({
//   loader: () => import('./users/UserHome'),
//   loading: () => <div>Loading...</div>,
// })

// export default [
//   { path: '/', component: UserAuth(), exact: true },
//   { path: '/userauth', component: UserAuth(), exact: true },
//   { path: '/chefauth', component: ChefAuth(), exact: true },
//   { path: '/chef', component: ChefHome(), exact: true },
//   { path: '/user', component: UserHome(), exact: true },
// ];

/***** Attempt to create codesplitter helper function but cannot get to work and don't know why since the same logic works without a helper function *****/
// const codeSplitter = pathToModule => props => <AsyncRoute props={props} loadingPromise={import(pathToModule)} />
// const ChefAuth = codeSplitter('./auth/ChefAuth')

/***** Codesplitting using AsyncRoute.jsx approach detailed by Brian Holt in Frontend Masters *****/
const ChefAuth = props => <AsyncRoute props={props} loadingPromise={import('./auth/ChefAuth')} />;
// console.log('UserHome import() call within routes.jsx is', import('./users/UserHome').then(data => console.log('promise resolved with', data)));
const UserAuth = (props) => <AsyncRoute props={props} loadingPromise={import('./auth/UserAuth')} />
const ChefHome = props => <AsyncRoute props={props} loadingPromise={import('./chefs/ChefHome')} />;
const UserHome = props => <AsyncRoute props={props} loadingPromise={import('./users/UserHome')} />;
// const ViewChefSchedule = (props) => <AsyncRoute props={props} loadingPromise={import('./users/ChefSchedule')} />
// const MakeReservation = (props) => <AsyncRoute props={props} loadingPromise={import('./users/MakeReservation')} />

export default [
  { path: '/', component: UserAuth, exact: true },
  { path: '/userauth', component: UserAuth, exact: true },
  { path: '/chefauth', component: ChefAuth, exact: true },
  { path: '/chef', component: ChefHome, exact: true },
  { path: '/user', component: UserHome, exact: true },
  // { path: '/user/chefschedule', component: ViewChefSchedule, exact: true },
  // { path: '/user/chefschedule/reservation', component: MakeReservation, exact: true },
];
