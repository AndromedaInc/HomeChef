import ChefAuth from './auth/ChefAuth';
// import ConsumerAuth from './auth/ConsumerAuth';
import ChefHome from './chefs/ChefHome';
import ConsumerHome from './consumers/ConsumersHome';
import importComponent from './codeSplittingHelper';

const ConsumerAuth = importComponent('./auth/ConsumerAuth');

export default [
  { path: '/', component: ConsumerAuth, exact: true },
  { path: '/auth/consumer', component: ConsumerAuth, exact: true },
  { path: '/auth/chef', component: ChefAuth, exact: true },
  { path: '/chef', component: ChefHome, exact: true },
  { path: '/consumer', component: ConsumerHome, exact: true },
];
