import React, { Component } from 'react';
import axios from 'axios';
import ChefSchedule from './ChefSchedule';
import ChefAccountForm from './ChefAccountForm';
import ChefAccountInfo from './ChefAccountInfo';

class ChefHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      address: 'test address',
      streetAddress: '',
      city: '',
      stateName: '',
      zip: null,
      description: '',
      username: 'chefusername', // will want to change from hardcode
      name: 'testchef', // may want to remove from here
      password: 'chefpass', // may want to remove from here
      imageUrl: 'chefimage.com', // may want to remove from here
      id: 1,
    };

    this.onChange = this.onChange.bind(this);
    this.toggleEditAccount = this.toggleEditAccount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpsert = this.handleUpsert.bind(this);
    this.getAccountInfo = this.getAccountInfo.bind(this);
  }

  componentDidMount() {
    this.getAccountInfo();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getAccountInfo() {
    const { username } = this.state;
    return axios.get(`/api/chef/accountInfo?username=${username}`)
      .then(({
        data: {
          description,
          streetAddress,
          city,
          stateName,
          zip,
          id,
          imageUrl,
          name,
          password,
        },
      }) => (
        this.setState({
          description,
          streetAddress,
          city,
          stateName,
          zip,
          id,
          imageUrl,
          name,
          password,
          username,
        })
      ));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('handling submit');
    this.handleUpsert(this.state);
    this.toggleEditAccount();
  }

  handleUpsert() {
    console.log('sending upsert patch request with this state:', this.state);
    axios.patch('/api/chef/accountInfo', { data: this.state })
      .then(() => console.log('upsert successful'))
      .then(() => this.getAccountInfo());
  }

  toggleEditAccount() {
    const { edit } = this.state;
    this.setState({
      edit: !edit,
    });
  }

  renderView() {
    const { edit } = this.state;
    const editButton = edit ? 'Save' : 'Edit your account';
    if (edit) {
      return (
        <ChefAccountForm
          state={this.state}
          onChange={this.onChange}
          handleSubmit={this.handleSubmit}
        />
      );
    }
    return (
      <div>
        <button
          type="button"
          onClick={this.toggleEditAccount}
        >
          {editButton}
        </button>
        <ChefAccountInfo state={this.state} />
      </div>
    );
  }

  render() {
    const { id } = this.state;
    return (
      <div>
        <h1>What's Cooking?</h1>
        {this.renderView()}
        <ChefSchedule chefId={id} />
      </div>
    );
  }
}

export default ChefHome;
