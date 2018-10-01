import React from 'react';
import ViewChefSchedule from './ViewChefSchedule';

class UsersChefDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Where the info will go
        {this.props.chef}
        <ViewChefSchedule />
      </div>
    );
  }
};

export default UsersChefDetails;
