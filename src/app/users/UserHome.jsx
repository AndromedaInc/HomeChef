import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getChefList } from '../redux/actions/chefActions';
import MapContainer from '../redux/sampleComponents/MapContainer';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  componentWillMount() {
    this.props.getChefList();
    this.getUserDetails(this.props.location.state.username);
  }


  getUserDetails(username) {
    axios.get(`/api/user/accountInfo?username=${username}`).then((res) => {
      this.setState({
        user: res.data,
      });
    });
  }

  renderChefList() {
    const { user } = this.state;
    const { chefs } = this.props;
    return chefs.map(chef => (
      <ul key={chef.id}>
        <li>
          <div>
            {`Chef: ${chef.username}, Address: ${chef.streetAddress} ${chef.city}, ${
              chef.stateName
              }, ${chef.zip}, Description: ${chef.description}`}
            <Link
              to={{
                pathname: '/user/chefdetails',
                state: { user, chef },
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
    const { user } = this.state;
    const { chefs } = this.props;
    const { latitude, longitude } = this.props.location.state;
    return (
      <div>
        <h1>{user.username}</h1>
        <h2>HomeChef</h2>
        <Link to={{
          pathname: '/user/transactions',
          state: { userId },
        }}
        >
          <button type="button">My Transactions</button>
        </Link>
        {this.renderChefList()}
        <MapContainer
          latitude={latitude}
          longitude={longitude}
          chefs={chefs}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chefs: state.chefs.chefsAvailable,
});
export default connect(
  mapStateToProps,
  {
    getChefList,
  },
)(UserHome);
