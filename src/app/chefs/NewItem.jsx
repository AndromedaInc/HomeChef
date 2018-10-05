import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      name: null,
      price: null,
      description: null,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSave() {
    const { chefId } = this.props.location.state;
    const {
      redirect,
      imageUrl,
      name,
      price,
      description,
    } = this.state;
    axios.post('/api/chef/menu/add', {
      chefId,
      imageUrl,
      name,
      price,
      description,
    })
      .then(() => {
        this.setState({ redirect: !redirect });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { redirect } = this.state;
    const { chefId } = this.props.location.state;
    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/chef/menu/update',
            state: { chefId },
          }}
        />
      );
    }
    return (
      <form>
        <h1>Add a New Menu Item</h1>
        Image:
        <input
          name="imageUrl"
          type="text"
          onChange={this.handleChange}
        />
        <br />
        Name:
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
        />
        <br />
        Price:
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          onChange={this.handleChange}
        />
        <br />
        Description:
        <input
          name="description"
          type="text"
          onChange={this.handleChange}
        />
        <br />
        <button type="button" onClick={this.handleSave.bind(this)}>Save</button>
        <br />
        <br />
      </form>
    );
  }
}

export default NewItem;
