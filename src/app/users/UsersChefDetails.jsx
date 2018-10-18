import React from 'react';
import { Link } from 'react-router-dom';
import ViewChefSchedule from './ViewChefSchedule';

class UsersChefDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      chef, user, latitude, longitude,
    } = this.props.location.state;
    return (
      <div className="grid-container">
        <h3>{chef.name}</h3>
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
        {/* <div className="grid-center"> */}
        <ViewChefSchedule user={user} chef={chef} latitude={latitude} longitude={longitude} />
        {/* </div> */}
        <Link
          to={{
            pathname: '/user',
            state: { username: user.username, latitude, longitude },
          }}
        >
          <button type="button">Back</button>
        </Link>
      </div>
    );
  }
}

export default UsersChefDetails;
