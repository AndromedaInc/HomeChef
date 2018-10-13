import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class ChefAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      username: '',
      password: '',
      signup: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendLogin = this.sendLogin.bind(this);
    this.sendSignup = this.sendSignup.bind(this);
  }

  setLogin() {
    this.setState({
      signup: false,
    });
  }

  setSignup() {
    this.setState({
      signup: true,
    });
  }

  sendLogin() {
    const { username, password } = this.state;
    axios
      .post('/login', {
        username,
        password,
      })
      .then((res) => {
        console.log('response from login is', res);
        const {
          data: { chefId },
        } = res;
        this.setState({
          redirect: true,
          chefId,
        });
      })
      .catch(err => console.log(err));
  }

  sendSignup() {
    const {
      username, password, name, email,
    } = this.state;
    axios
      .post('/signup', {
        username,
        password,
        name,
        email,
      })
      .then((res) => {
        console.log('response from signup is', res);
        const {
          data: { chefId },
        } = res;
        this.setState({
          redirect: true,
          chefId,
        });
      })
      .catch(err => console.log(err));
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signup } = this.state;
    return signup ? this.sendSignup() : this.sendLogin();
  }

  renderRedirect() {
    const { redirect, chefId } = this.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: '/chef',
            state: { chefId },
          }}
        />
      );
    }
    return null;
  }

  render() {
    const {
      signup, username, password, name, email,
    } = this.state;
    const hideOrShow = signup ? 'text' : 'hidden';
    return (
      <div className="grid-subcontainer">
        <div className="grid-center">
          <Fragment>
            {this.renderRedirect()}
            <form onSubmit={this.handleSubmit}>
              <div className="chef-login">
                <h1>Welcome, Chef!</h1>
                <button type="button" onClick={() => this.setLogin()}>
                  Login
                </button>
                <button type="button" onClick={() => this.setSignup()}>
                  Signup
                </button>
                <br />
                <br />
                <div>
                  <label>Username: </label>
                  {' '}
                  <br />
                  <input name="username" value={username} type="text" onChange={this.handleChange} />
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
                <div style={{ visibility: signup ? 'visible' : 'hidden' }}>
                  <label>Name: </label>
                  <br />
                  <input name="name" value={name} type={hideOrShow} onChange={this.handleChange} />
                </div>
                <div style={{ visibility: signup ? 'visible' : 'hidden' }}>
                  <label>Email: </label>
                  <br />
                  <input name="email" value={email} type={hideOrShow} onChange={this.handleChange} />
                </div>
                <button className="highlight" type="submit">Submit</button>
              </div>
            </form>
            <br />
            <br />
            <Link to="/userauth">Login as a User</Link>
          </Fragment>
        </div>
      </div>
    );
  }
}

export default ChefAuth;
