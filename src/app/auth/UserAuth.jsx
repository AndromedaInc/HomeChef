import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from '../redux/store';

class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    const { username, password } = this.state;

    e.preventDefault();
    axios
      .post('/api/user/login', {
        username,
        password,
      })
      .then((res) => {
        console.log('response from user login is', res);
        this.setState({
          redirect: true,
        });
      })
      .catch(err => console.log(err));
  }

  renderRedirect() {
    const { redirect, username } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: '/user',
            state: { username },
          }}
        />
      );
    }
  }

  render() {
    const { username, password } = this.state;
    return (
      <Provider store={store}>
        <Fragment>
          {this.renderRedirect()}

          <Link to="/chefauth">
            <button type="button">Login as a Chef</button>
          </Link>
          <form onSubmit={this.handleSubmit}>
            <div className="user-login">
              <h3>Login as a User</h3>
              <div>
                <label>Username: </label>
                {' '}
                <br />
                <input name="username" value={username} onChange={this.handleChange} />
              </div>
              <div>
                <label>Password: </label>
                <br />
                <input
                  name="password"
                  value={password}
                  type="password"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit">Login</button>
            </div>
          </form>
        </Fragment>
      </Provider>
    );
  }
}

export default UserAuth;
