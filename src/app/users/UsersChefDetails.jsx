import React from 'react';
import axios from 'axios';
import ViewChefSchedule from './ViewChefSchedule';

class UsersChefDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: [],
      currentChef: '',
      chefDetails: [],
    };
    this.getChefDetails = this.getChefDetails.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  componentDidMount() {
    const receivedUsername = this.props.location.state.username;
    const receivedCurrentChef = this.props.location.state.currentChef;

    this.setState({
      currentChef: receivedCurrentChef,
    });
    this.getChefDetails(receivedCurrentChef);
    this.getUserDetails(receivedUsername);
  }

  getChefDetails(chefUsername) {
    axios.get(`/api/chef/accountInfo?username=${chefUsername}`).then((res) => {
      this.setState({
        chefDetails: res.data,
      });
    });
  }

  getUserDetails(username) {
    axios.get(`/api/user/accountInfo?username=${username}`).then((res) => {
      this.setState({
        userDetails: res.data,
      });
    });
  }

  render() {
    const { currentChef, chefDetails, userDetails } = this.state;
    return (
      <div>
        <h3>{`Chef ${currentChef}`}</h3>
        <div>
          {`Address - ${chefDetails.streetAddress}`}
          {' '}
          <br />
          {' '}
          {`${chefDetails.city}, ${chefDetails.stateName}, ${chefDetails.zip}`}
          <br />
          {`Description - ${chefDetails.description}`}
        </div>
        <br />
        <ViewChefSchedule user={userDetails} chef={chefDetails} />
      </div>
    );
  }
}

export default UsersChefDetails;
