import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const post = {
      username: this.state.username,
    };
    this.props.createPost(post);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Username:</label>
            <br />
            <input type="text" name="username" onChange={this.onChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { createPost },
)(PostForm);
