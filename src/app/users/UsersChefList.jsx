import React from 'react';

class UsersChefList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.chefs.map(chef => {
      return (
        <div>
          Chef: {chef.chefUsername}, Address: {chef.chefAddress}, Description:{' '}
          {chef.chefDescription}, Hours: {chef.chefHours}
        </div>
      );
    });
  }
}

export default UsersChefList;
