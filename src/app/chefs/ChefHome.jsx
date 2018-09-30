import React, { Component } from 'react';

// const ChefHome = () => <div>Chef Home View Here</div>;

class ChefHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      streetAddress: '',
      city: '',
      stateName: '',
      zip: 0,
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

  render() {
    const {
      edit,
      streetAddress,
      city,
      stateName,
      zip,
      cuisine,
      id,
    } = this.state;
    const editButton = edit ? 'Save' : 'Edit your account';

    return (
      <div>
        <h1>What's Cooking?</h1>
        <button type="button" value={editButton} onClick={this.toggleEditAccount}>Manage your account</button>
        <form onSubmit={this.handleSubmit}>
          <h3>Address</h3>
          <label htmlFor="address">
            Street Address:
            <input type="text" name="streetAddress" value={streetAddress} onChange={this.onChange} />
          </label>
          <label htmlFor="city">
            City:
            <input type="text" name="city" value={city} onChange={this.onChange} />
          </label>
          <label htmlFor="stateName">
            State:
            <input type="text" name="stateName" value={stateName} onChange={this.onChange} />
          </label>
          <label htmlFor="zip">
            Zip:
            <input type="text" name="zip" value={zip} onChange={this.onChange} />
          </label>
          <br />
          <h3>Cuisine</h3>
          <label htmlFor="cuisine">
            How do you describe your food?
            <input type="textarea" name="cuisine" value={cuisine} onChange={this.onChange} />
          </label>
          <br />
          {/* <label htmlFor="distance">
            Distance:
            <input type="textarea" name="distanceInMiles" value={distanceInMiles} onChange={this.onChange} />
          </label>
          <br />
          <label htmlFor="duration">
            Duration:
            <input type="text" name="timeToCompleteInHours" value={timeToCompleteInHours} onChange={this.onChange} />
          </label>
          <br />
          <label htmlFor="speed">
            Speed (MPH):
            <input type="text" name="averageSpeedMPH" value={averageSpeedMPH} onChange={this.onChange} />
          </label>
          <br /> */}
          <input type="hidden" name="id" value={id} onChange={this.onChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={this.onDelete}>Delete</button>
        </form>
      </div>
    );
  }
}

export default ChefHome;
