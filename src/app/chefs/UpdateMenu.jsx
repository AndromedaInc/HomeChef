import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UpdateItem from './UpdateItem';

class UpdateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };
  }

  componentDidMount() {
    const { chefId } = this.props.location.state;
    axios
      .get('/api/chef/menu', { params: { id: chefId } })
      .then((data) => {
        this.setState({ menuItems: data.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { chefId } = this.props.location.state;
    const { menuItems } = this.state;
    return (
      <div>
        <h1>Your Menu</h1>
        <Link
          to={{
            pathname: '/chef/menu/new',
            state: { chefId },
          }}
        >
          <button type="button">Add New Menu Item</button>
        </Link>
        <Link
          to={{
            pathname: '/chef',
            state: { chefId },
          }}
        >
          <button type="button">Back to Schedule</button>
        </Link>
        <br />
        <br />
        {menuItems.map(item => (
          <UpdateItem item={item} chefId={chefId} />
        ))}
      </div>
    );
  }
}

export default UpdateMenu;
