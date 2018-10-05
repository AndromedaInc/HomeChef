import React from 'react';
import axios from 'axios';

class UpdateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      imageUrl: null,
      name: null,
      price: null,
      description: null,
      item: props.item,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSave() {
    const { item } = this.state;
    const {
      edit,
      imageUrl,
      name,
      price,
      description,
    } = this.state;
    const params = { id: item.id };
    // params -> send only changed values to DB
    // item -> update changed values for rendering item
    if (imageUrl) {
      params.imageUrl = imageUrl;
      item.imageUrl = imageUrl;
    }
    if (name) {
      params.name = name;
      item.name = name;
    }
    if (price) {
      params.price = price;
      item.price = price;
    }
    if (description) {
      params.description = description;
      item.description = description;
    }
    axios.post('/api/chef/menu/update', params)
      .then(() => {
        this.setState({ edit: !edit, item });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { edit, item } = this.state;
    if (!edit) {
      return (
        <div key={item.id}>
          <img width="300px" alt={item.name} src={item.imageUrl} />
          <h3>{item.name}</h3>
          <p>
            $
            {(+item.price).toFixed(2)}
          </p>
          <p>{item.description}</p>
          <button type="button" onClick={this.handleEdit.bind(this, item)}>Edit</button>
          <br />
          <br />
        </div>
      );
    }
    return (
      <form key={item.id}>
        Image:
        <input
          type="text"
          name="imageUrl"
          defaultValue={item.imageUrl}
          onChange={this.handleChange}
        />
        <br />
        Name:
        <input
          type="text"
          name="name"
          defaultValue={item.name}
          onChange={this.handleChange}
        />
        <br />
        Price:
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={item.price}
          onChange={this.handleChange}
        />
        <br />
        Description:
        <input
          type="text"
          name="description"
          defaultValue={item.description}
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

export default UpdateItem;
