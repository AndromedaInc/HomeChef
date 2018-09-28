import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

<<<<<<< HEAD
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
=======
class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerUsername: '',
      customerPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    // e.preventDefault();
  }
  render() {
    return (
      <Fragment>
        <Link to="/auth/chef">
          <button type="button">Login as a Chef</button>
        </Link>
        <form onSubmit={this.handleSubmit}>
          <div className="customer-login">
            <h3>Login as a User</h3>
            <div>
              Username: <br />
              <input
                name="customerUsername"
                value={this.state.customerUsername}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Password: <br />
              <input
                name="customerPassword"
                value={this.state.customerPassword}
                type="password"
                onChange={this.handleChange}
              />
            </div>
            <Link to="/user">
              <button type="button">Login</button>
            </Link>
          </div>
        </form>
      </Fragment>
    );
  }
}
>>>>>>> refactor for user/chef and add 3 sample chefs

export default UserAuth;
