import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Posts from '../redux/sampleComponents/Posts';
import PostForm from '../redux/sampleComponents/PostForm';

class UserAuth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      userPassword: '',
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
    e.preventDefault();
    // const post = {
    //   username: this.state.username,
    //   password: this.state.password
    // };
    // fetch("https://jsonplaceholder.typicode.com/posts", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json"
    //   },
    //   body: JSON.stringify(post)
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     // if (data) {
    //     //   redirect: window.location.replace("../user.html");
    //     // }
    //     // console.log(data);
    //   });
  }

  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <Link to="/public/chefauth">
            <button type="button">Login as a Chef</button>
          </Link>
          <form onSubmit={this.handleSubmit}>
            <div className="user-login">
              <h3>Login as a User</h3>
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
          {/* <PostForm />
          <Posts /> */}
        </Fragment>
      </Provider>
    );
  }
}

export default UserAuth;
