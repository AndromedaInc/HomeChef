import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ConsumerAuth = () => (
  <Fragment>
    <div>Consumer Login Here</div>
    <Link to="/auth/chef">
      <button type="button">Go to login as a Chef</button>
    </Link>
    <Link to="/consumer">
      <button type="button">Login</button>
    </Link>
  </Fragment>
);

export default ConsumerAuth;
