import React from 'react';

class UsersChefList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.props.chefs.map(chef => {
      return (
        <ul>
          <li>
            <div onClick={this.props.handleClick}>
              Chef: {chef.chefUsername}, Address: {chef.chefAddress},
              Description: {chef.chefDescription}, Hours: {chef.chefHours}
            </div>
          </li>
        </ul>
      );
    });
  }
}

export default UsersChefList;
