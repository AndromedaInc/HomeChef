import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from '../redux/store';
// import Posts from '../redux/sampleComponents/Posts';
// import PostForm from '../redux/sampleComponents/PostForm';

class ChefAuth extends React.Component {
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
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    const { username, password } = this.state;
    // const { history } = this.props;
    e.preventDefault();
    axios.post('/login', {
      username,
      password,
    }).then((res) => {
      console.log('response from login is', res);
      // history.push('/chef');
      const { data: { userId } } = res;
      console.log(userId);
      this.setState({
        redirect: true,
        userId,
      });
    }).catch(err => console.log(err));
  }

  renderRedirect() {
    const { redirect, userId } = this.state;
    if (redirect) {
      return (
        <Redirect to={{
          pathname: '/chef',
          state: { userId },
        }}
        />
      );
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          {this.renderRedirect()}
          <Link to="/userauth">
            <button type="button">Login as a User</button>
          </Link>
          <form onSubmit={this.handleSubmit}>
            <div className="chef-login">
              <h3>Login as a Chef</h3>
              <div>
                <label>Username: </label>
                {' '}
                <br />
                <input
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <label>Password: </label>
                <br />
                <input
                  name="password"
                  value={this.state.password}
                  type="password"
                  onChange={this.handleChange}
                />
              </div>
              {/* <Link to="/chef"> */}
              <button type="submit">Login</button>
              {/* </Link> */}
            </div>
          </form>
          {/* <PostForm />
          <Posts /> */}
        </Fragment>
      </Provider>
    );
  }
}

export default ChefAuth;
