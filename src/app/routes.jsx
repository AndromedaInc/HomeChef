import React from 'react';
import UserAuth from './auth/UserAuth';
// import ChefAuth from './auth/ChefAuth';
// import ChefHome from './chefs/ChefHome';
// import UserHome from './users/UserHome';
// import ViewChefSchedule from './users/ViewChefSchedule';
import AsyncRoute from './AsyncRoute';

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

// const codeSplitter = pathToModule => props => <AsyncRoute props={props} loadingPromise={import(pathToModule)} />
// const ChefAuth = codeSplitter('./auth/ChefAuth')

const ChefAuth = (props) => <AsyncRoute props={props} loadingPromise={import('./auth/ChefAuth')} />
// console.log('UserHome import() call within routes.jsx is', import('./users/UserHome').then(data => console.log('promise resolved with', data)));
// const UserAuth = (props) => <AsyncRoute props={props} loadingPromise={import('./auth/UserAuth')} />
const ChefHome = (props) => <AsyncRoute props={props} loadingPromise={import('./chefs/ChefHome')} />
const UserHome = (props) => <AsyncRoute props={props} loadingPromise={import('./users/UserHome')} />

export default [
  { path: '/', component: UserAuth, exact: true },
  { path: '/public/userauth', component: UserAuth, exact: true },
  { path: '/public/chefauth', component: ChefAuth, exact: true },
  { path: '/public/chef', component: ChefHome, exact: true },
  { path: '/public/user', component: UserHome, exact: true },
  { path: '/public/user/chefschedule', component: ViewChefSchedule, exact: true },
];