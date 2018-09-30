import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const UserAuth = () => (
  <Fragment>
    <div>User Login Here</div>
    <Link to="/public/chefauth">
      <button type="button">Go to login as a Chef</button>
    </Link>
    <Link to="/public/user">
      <button type="button">Login</button>
    </Link>
  </Fragment>
);

export default UserAuth;
