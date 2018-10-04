import React from 'react';
import axios from 'axios';

class UpdateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      imageUrl: '',
      name: '',
      price: null,
      description: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit }, () => this.render());
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSave(item) {
    console.log(item);
    const { edit, imageUrl, name, price, description } = this.state;
    axios.post('/api/chef/menu/update', {
      imageUrl,
      name,
      price,
      description,
    })
      .then(() => {
        this.setState({ edit: !edit }, () => this.render());
      })
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);
    const { item } = this.props;
    const { edit } = this.state;
    if (!edit) {
      return (
        <div key={item.id}>
          <img alt={item.name} src={item.imageUrl} />
          <h3>{item.name}</h3>
          <p>
            $
            {item.price.toFixed(2)}
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
          type="text"
          name="price"
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
        <button type="button" onClick={this.handleSave.bind(this, item)}>Save</button>
        <br />
        <br />
      </form>
    );
  }
}

export default UpdateItem;
