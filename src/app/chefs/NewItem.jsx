import React from 'react';
import axios from 'axios';
// import { Redirect } from 'react-router-dom';

class NewItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: null,
      name: null,
      price: null,
      description: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSave() {
    const { chefId } = this.props.location.state;
    const { imageUrl, name, price, description } = this.state;
    axios.post('/api/chef/menu/add', {
      chefId,
      imageUrl,
      name,
      price,
      description,
    })
      .then(() => {
        // return <Redirect to="/chef/menu/update" />;
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form>
        <h1>Add a New Menu Item</h1>
        Image:
        <input
          type="text"
          name="imageUrl"
          onChange={this.handleChange}
        />
        <br />
        Name:
        <input
          type="text"
          name="name"
          onChange={this.handleChange}
        />
        <br />
        Price:
        <input
          type="text"
          name="price"
          onChange={this.handleChange}
        />
        <br />
        Description:
        <input
          type="text"
          name="description"
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
