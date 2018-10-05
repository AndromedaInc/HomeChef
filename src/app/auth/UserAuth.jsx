import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';
import store from '../redux/store';
import Posts from '../redux/sampleComponents/Posts';
import PostForm from '../redux/sampleComponents/PostForm';

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
    // this.handleLogin = this.handleLogin.bind(this);
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
    const { history } = this.props;

    e.preventDefault();
    axios.post('/api/user/login', {
      username,
      password,
    }).then((res) => {
      console.log('response from loginTest is', res);
      history.push('/user');
      // this.setState({
      //   redirect: true,
      // });
    }).catch(err => console.log(err));
  }

  render() {
//     if (this.state.redirect) {
//       return (
//         <Redirect to={{
//           pathname: '/user',
//           state: { username: this.state.username },
//         }}
//      />
// );
//     }
    return (
      <Provider store={store}>
        <Fragment>
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
                <input name="username" value={this.state.username} onChange={this.handleChange} />
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
              <Link
                to={{
                  pathname: '/user',
                  state: { username: this.state.username },
                }}
              >
              <button type="submit">Login</button>
              </Link>
            </div>
          </form>
          {/* <PostForm />
          <Posts /> */}
        </Fragment>
      </Provider>
    );
  }
}

export default UserAuth;
