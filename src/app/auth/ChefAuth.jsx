import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ChefAuth = () => (
  <Fragment>
    <div>Chef Login Here</div>
    <Link to="/auth/user">
      <button type="button">Go to login as a User</button>
    </Link>
    <Link to="/chef">
      <button type="button">Login</button>
    </Link>
  </Fragment>
);

export default ChefAuth;
