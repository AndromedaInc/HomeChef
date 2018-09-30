import React, { Fragment } from "react";
import { Link } from "react-router-dom";

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
class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      userPassword: ""
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
        <Link to="/public/chefauth">
          <button type="button">Login as a Chef</button>
        </Link>
        <form onSubmit={this.handleSubmit}>
          <div className="user-login">
            <h3>Login as a User</h3>
            <div>
              Username: <br />
              <input
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Password: <br />
              <input
                name="userPassword"
                value={this.state.userPassword}
                type="password"
                onChange={this.handleChange}
              />
            </div>
            <Link to="/public/user">
              <button type="button">Login</button>
            </Link>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default UserAuth;
