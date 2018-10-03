import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UsersChefList from './UsersChefList';
import UsersChefDetails from './UsersChefDetails';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chefs: [
        {
          chefUsername: 'Sarah',
          chefAddress: 'South-SouthBay',
          chefDescription: 'I LOVE PAD THAI!!!!!!!!!!!!!',
          chefHours: '12:30-1:30pm, 5:30-6:30pm',
        },
        {
          chefUsername: 'Stephen',
          chefAddress: 'Actual Bay',
          chefDescription: 'I LIKE PAD THAI!!!!!!!!!!!!!',
          chefHours: '12:30-1:30pm, 5:30-6:30pm',
        },
        {
          chefUsername: 'Duke',
          chefAddress: 'East-East-East-East-East-East-East-East-East-East-East-East-Bay?',
          chefDescription: 'I WANT PAD THAI!!!!!!!!!!!!!',
          chefHours: '12:30-1:30pm, 5:30-6:30pm',
        },
      ],
      username: '',
    };
    this.getChefList = this.getChefList.bind(this);
  }

  componentDidMount() {
    this.getChefList();
    const receivedUsername = this.props.location.state.username;

    this.setState({
      username: receivedUsername,
    });
  }

  getChefList() {
    axios.get('/api/chef/all').then((res) => {
      this.setState({
        chefs: res.data,
      });
    });
  }

  renderChefList() {
    return this.state.chefs.map(chef => (
      <ul>
        <li>
          <div>
            Chef:
            {' '}
            {chef.chefUsername}
, Address:
            {' '}
            {chef.chefAddress}
, Description:
            {' '}
            {chef.chefDescription}
, Hours:
            {chef.chefHours}
            <Link
              to={{
                pathname: '/user/chefdetails',
                state: { username: this.state.username, currentChef: chef.chefUsername },
              }}
            >
              <button type="button">Select</button>
            </Link>
          </div>
        </li>
      </ul>
    ));
  }

  render() {
    return (
      <div>
        <h2>HomeChef</h2>
        {this.renderChefList()}
      </div>
    );
  }
}

export default UserHome;
