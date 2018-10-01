import React from 'react';

class UsersChefDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log('log:', this.props);
  }

  render() {
    return (
      <div>
        Where the info will go
        {this.props.chef}
      </div>
    );
  }
}

export default UsersChefDetails;
