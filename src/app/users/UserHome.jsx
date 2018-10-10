import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getChefList } from '../redux/actions/chefActions';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    console.log('PROPS: ', props);
    this.state = {
      username: '',
    };
  }

  componentWillMount() {
    this.props.getChefList();
  }

  componentDidMount() {
    const receivedUsername = this.props.location.state.username;
    this.setState({
      username: receivedUsername,
    });
  }

  renderChefList() {
    const { username } = this.state;
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
                state: { username, chef },
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
    const { userId } = this.props.location.state;
    return (
      <div>
        <h2>HomeChef</h2>
        <Link to="/user/transactions" userId={userId}><button type="button">My Transactions</button></Link>
        {this.renderChefList()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  chefs: state.chefs.chefsAvailable,
});
export default connect(
  mapStateToProps,
  { getChefList },
)(UserHome);
