import React from 'react';
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
    axios.get('/api/chef/menu', { params: { id: chefId } })
      .then((data) => {
        console.log('data.data', data.data);
        this.setState({ menuItems: data.data });
      })
      .catch(err => console.log(err));
  }

  // handleAddNew() {
  // }

  render() {
    const { menuItems } = this.state;
    return (
      <div>
        <h1>Your Menu</h1>
        <button type="button" onClick={this.handleAddNew}>Add New Menu Item</button>
        <br />
        <br />
        {menuItems.map(item => <UpdateItem item={item} />)}
      </div>
    );
  }
}

export default UpdateMenu;
