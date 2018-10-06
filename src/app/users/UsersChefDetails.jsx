import React from 'react';
import axios from 'axios';
import ViewChefSchedule from './ViewChefSchedule';

class UsersChefDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  componentDidMount() {
    const { username } = this.props.location.state;

    this.getUserDetails(username);
  }

  getUserDetails(username) {
    axios.get(`/api/user/accountInfo?username=${username}`).then((res) => {
      this.setState({
        userDetails: res.data,
      });
    });
  }

  render() {
    const { userDetails } = this.state;
    const { chef } = this.props.location.state;
    return (
      <div>
        <h3>{`Chef ${chef.name}`}</h3>
        <div>
          {`Address - ${chef.streetAddress}`}
          {' '}
          <br />
          {' '}
          {`${chef.city}, ${chef.stateName}, ${chef.zip}`}
          <br />
          {`Description - ${chef.description}`}
        </div>
        <br />
        <ViewChefSchedule user={userDetails} chef={chef} />
      </div>
    );
  }
}

export default UsersChefDetails;
