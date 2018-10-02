import React, { Component } from 'react';
import axios from 'axios';
import ChefSchedule from './ChefSchedule';
import ChefAccountForm from './ChefAccountForm';
import ChefAccountInfo from './ChefAccountInfo';

class ChefHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streetAddress: '',
      city: '',
      stateName: '',
      zip: null,
      cuisine: '',
      id: '',
      edit: false,
    };

    this.onChange = this.onChange.bind(this);
    this.toggleEditAccount = this.toggleEditAccount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  toggleEditAccount() {
    const { edit } = this.state;
    this.setState({
      edit: !edit,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.toggleEditAccount();
  }

  handleUpsert(route) {
    axios.patch('/api/routes', { data: route })
      .then(() => console.log('upsert successful'))
      .then(() => this.getRoutes());
  }

  renderView() {
    const { edit } = this.state;
    if (edit) {
      return (
        <ChefAccountForm state={this.state} onChange={this.onChange} handleSubmit={this.handleSubmit} />
        // <p>ChefAccountForm</p>
      );
    }
    return (
      <ChefAccountInfo state={this.state} />
      // <p>ChefAccountInfo</p>
    );
  }

  render() {
    const { edit } = this.state;
    const editButton = edit ? 'Save' : 'Edit your account';

    return (
      <div>
        <h1>What's Cooking?</h1>
        <button
          type="button"
          onClick={this.toggleEditAccount}
        >
          {editButton}
        </button>
        {this.renderView()}
        <ChefSchedule chefId={id} />
      </div>
    );
  }
}

export default ChefHome;
