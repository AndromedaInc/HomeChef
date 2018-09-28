import ChefAuth from './auth/ChefAuth';
import UserAuth from './auth/UserAuth';
import ChefHome from './chefs/ChefHome';
import UserHome from './users/UserHome';

export default [
  { path: '/', component: UserAuth, exact: true },
  { path: '/auth/user', component: UserAuth, exact: true },
  { path: '/auth/chef', component: ChefAuth, exact: true },
  { path: '/chef', component: ChefHome, exact: true },
  { path: '/user', component: UserHome, exact: true },
];
