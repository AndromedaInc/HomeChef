import React from 'react';
import axios from 'axios';
import ViewChefSchedule from './ViewChefSchedule';

class UsersChefDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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
      username: receivedUsername,
      currentChef: receivedCurrentChef,
    });
    this.getChefDetails(receivedCurrentChef);
    this.getUserDetails(receivedUsername);
  }

  getChefDetails(chefUsername) {
    axios.get(`/api/chef/accountInfo?username=${chefUsername}`).then((res) => {
      console.log(res.data);
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
    return (
      <div>
        <h3>{`Chef ${this.state.currentChef}`}</h3>

        <ViewChefSchedule />
        <div />
      </div>
    );
  }
}

export default UsersChefDetails;
