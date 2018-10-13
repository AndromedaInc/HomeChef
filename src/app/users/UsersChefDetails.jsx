import React from 'react';
import ViewChefSchedule from './ViewChefSchedule';

class UsersChefDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { chef, user } = this.props.location.state;
    return (
      <div>
        <h3>{`Chef ${chef.name}`}</h3>
        <div>
          {`${chef.streetAddress}`}
          {' '}
          <br />
          {' '}
          {`${chef.city}, ${chef.stateName}, ${chef.zip}`}
          <br />
          <br />
          {`${chef.description}`}
        </div>
        <br />
        <ViewChefSchedule user={user} chef={chef} />
      </div>
    );
  }
}

export default UsersChefDetails;
