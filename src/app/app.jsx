import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './routes';

const routeOptions = routes.map(({ path, component, exact }) => (
  <Route
    key={`${Math.random()}ROUTE_`}
    path={path}
    exact={exact}
    component={component}
  />
));

export default () => <Switch>{routeOptions}</Switch>;
