import React from 'react';
import axios from 'axios';
import UsersChefList from './UsersChefList';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chefs: [
        {
          chefUsername: 'Sarah',
          chefAddress: 'South-SouthBay',
          chefDescription: 'I LOVE PAD THAI!!!!!!!!!!!!!',
          chefHours: '12:30-1:30pm, 5:30-6:30pm'
        },
        {
          chefUsername: 'Stephen',
          chefAddress: 'Actual Bay',
          chefDescription: 'I LIKE PAD THAI!!!!!!!!!!!!!',
          chefHours: '12:30-1:30pm, 5:30-6:30pm'
        },
        {
          chefUsername: 'Duke',
          chefAddress:
            'East-East-East-East-East-East-East-East-East-East-East-East-Bay?',
          chefDescription: 'I WANT PAD THAI!!!!!!!!!!!!!',
          chefHours: '12:30-1:30pm, 5:30-6:30pm'
        }
      ],
      currentChef: '',
      username: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // axios.get('/api/chefs', (req, res) => {});
  }
  handleClick() {}
  render() {
    return (
      <div>
        <h2>HomeChef</h2>
        <UsersChefList
          handleClick={this.handleClick}
          chefs={this.state.chefs}
        />
      </div>
    );
  }
}

export default UserHome;
