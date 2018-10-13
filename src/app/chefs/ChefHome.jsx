import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import ChefSchedule from './ChefSchedule';
import ChefAccountForm from './ChefAccountForm';
import ChefAccountInfo from './ChefAccountInfo';

class ChefHome extends Component {
  constructor(props) {
    super(props);

    let id;
    if (this.props.location.state) {
      id = this.props.location.state.chefId;
    }

    this.state = {
      city: '',
      description: '',
      edit: false,
      id,
      imageUrl: '',
      name: '',
      password: '',
      stateName: '',
      streetAddress: '',
      username: '',
      zip: null,
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

  // ? Note: We may need a component willUnmountMethod that cancels asynchronous tasks if we decide to keep our current redirect approach if the component does not receive and chefId. As of now, we redirect successfully but receive the following error when attempting to navigate directly to the /chef address with a valid cookie (but since navigating directly, we do not pass in chefId in props) Received following error: "Warning: Can't call setState (or forceUpdate) on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method."

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  getAccountInfo() {
    const { id } = this.state;
    return axios.get(`/api/chef/accountInfo?id=${id}`)
      .then(({
        data: {
          city,
          description,
          imageUrl,
          name,
          password,
          stateName,
          streetAddress,
          username,
          zip,
        },
      }) => (
        this.setState({
          description,
          streetAddress,
          city,
          stateName,
          zip,
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
    const { edit, id } = this.state;
    const editButton = edit ? 'Save' : 'Edit your account';
    if (!id) {
      return <Redirect to={{ pathname: '/chefauth' }} />;
    }
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
      <div className="grid-subcontainer">
        <div className="grid-center">
        <h1>What's Cooking?</h1>
        <Link to={{
          pathname: '/chef/transactions',
          state: { chefId: id },
        }}
        ><button type="button">My Transactions</button></Link>
        {this.renderView()}
        <ChefSchedule chefId={id} />
      </div>
      </div>
    );
  }
}

export default ChefHome;
