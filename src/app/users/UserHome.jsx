import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserHome extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      chefs: [],
      username: '',
    };
    this.getChefList = this.getChefList.bind(this);
  }

  componentDidMount() {
    this.getChefList();
    const receivedUsername = this.props.location.state.username;

    this.setState({
      username: receivedUsername,
    });
  }

  getChefList() {
    axios.get('/api/chef/all').then((res) => {
      this.setState({
        chefs: res.data,
      });
    });
  }

  renderChefList() {
    const { chefs, username } = this.state;
    return chefs.map(chef => (
      <ul>
        <li>
          <div>
            {`Chef: ${chef.username}, Address: ${chef.streetAddress} ${chef.city}, ${
              chef.stateName
            }, ${chef.zip}, Description: ${chef.description}`}

            <Link
              to={{
                pathname: '/user/chefdetails',
                state: { username, currentChef: chef.username },
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
    return (
      <div>
        <h2>HomeChef</h2>
        {this.renderChefList()}
      </div>
    );
  }
}

export default UserHome;
