import React from 'react';
import AsyncRoute from './AsyncRoute';

/***** code to handle require.ensure error that would otherwise pop up on server (also tried babel-plugin-dynamic-import-node but could not get to work) *****/
if (typeof require.ensure !== 'function')
  require.ensure = (d, c) => {
    c(require);
  };
if (typeof require.include !== 'function') require.include = () => {};

/***** Codesplitting using AsyncRoute.jsx approach detailed by Brian Holt in Frontend Masters *****/
const ChefAuth = props => <AsyncRoute props={props} loadingPromise={import('./auth/ChefAuth')} />;
const UserAuth = props => <AsyncRoute props={props} loadingPromise={import('./auth/UserAuth')} />;
const ChefHome = props => <AsyncRoute props={props} loadingPromise={import('./chefs/ChefHome')} />;
const UserHome = props => <AsyncRoute props={props} loadingPromise={import('./users/UserHome')} />;
const UsersChefDetails = props => (<AsyncRoute props={props} loadingPromise={import('./users/UsersChefDetails')} />);
const ViewChefSchedule = props => (<AsyncRoute props={props} loadingPromise={import('./users/ViewChefSchedule')} />);
const MakeReservation = props => (<AsyncRoute props={props} loadingPromise={import('./users/MakeReservation')} />);
const ChefSchedule = props => (<AsyncRoute props={props} loadingPromise={import('./chefs/ChefSchedule')} />);
const UpdateMenu = props => (<AsyncRoute props={props} loadingPromise={import('./chefs/UpdateMenu')} />);
const NewItem = props => (<AsyncRoute props={props} loadingPromise={import('./chefs/NewItem')} />);
const UpdateSchedule = props => (<AsyncRoute props={props} loadingPromise={import('./chefs/UpdateSchedule')} />);
const UserTransactions = props => (<AsyncRoute props={props} loadingPromise={import('./users/UserTransactions')} />);
const ChefTransactions = props => (<AsyncRoute props={props} loadingPromise={import('./chefs/ChefTransactions')} />);
const Stripe = props => (<AsyncRoute props={props} loadingPromise={import('./users/Stripe')} />);


export default [
  { path: '/', component: UserAuth, exact: true },
  { path: '/userauth', component: UserAuth, exact: true },
  { path: '/chefauth', component: ChefAuth, exact: true },
  { path: '/chef', component: ChefHome, exact: true },
  { path: '/user', component: UserHome, exact: true },
  { path: '/user/chefdetails', component: UsersChefDetails, exact: true },
  { path: '/user/chefschedule', component: ViewChefSchedule, exact: true },
  { path: '/user/chefschedule/reservation', component: MakeReservation, exact: true },
  { path: '/chef/schedule', component: ChefSchedule, exact: true },
  { path: '/chef/menu/update', component: UpdateMenu, exact: true },
  { path: '/chef/menu/new', component: NewItem, exact: true },
  { path: '/chef/schedule/update', component: UpdateSchedule, exact: true },
  { path: '/user/transactions', component: UserTransactions, exact: true },
  { path: '/chef/transactions', component: ChefTransactions, exact: true },
  { path: '/user/checkout', component: Stripe, exact: true },

];
