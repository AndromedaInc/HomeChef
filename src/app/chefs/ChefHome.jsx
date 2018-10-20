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
    this.handleUpsert(this.state);
    this.toggleEditAccount();
  }

  handleUpsert() {
    axios.patch('/api/chef/accountInfo', { data: this.state })
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
    const editButton = edit ? 'Save' : 'Edit My account';
    if (!id) {
      return <Redirect to={{ pathname: '/chefauth' }} />;
    }
    if (edit) {
      return (
        <div>
          <ChefAccountForm
            state={this.state}
            onChange={this.onChange}
            handleSubmit={this.handleSubmit}
          />
        </div>

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
          >
            <button type="button">My Transactions</button>

          </Link>
          {this.renderView()}
          <ChefSchedule chefId={id} />
        </div>
      </div>
    );
  }
}

export default ChefHome;
