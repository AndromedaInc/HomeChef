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
      currentChef: '',
      username: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const receivedUsername = this.props.location.state.username;

    this.setState({
      username: receivedUsername,
    });
    // axios.get('/api/chefs', (req, res) => {});
  }

  handleClick(username) {
    this.setState({ currentChef: username });
    console.log(this.state);
  }

  renderChefList() {
    return this.state.chefs.map(chef => (
      <ul>
        <li>
          <div onClick={() => this.handleClick(chef.chefUsername)}>
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
            <Link to="/user/chefdetails">
              <button type="button">Select</button>
            </Link>
          </div>
        </li>
      </ul>
    ));
  }

  // renderChefDetails() {
  //   if (this.state.currentChef !== '') {
  //     return <div>{this.state.currentChef}</div>;
  //   }
  // }
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
