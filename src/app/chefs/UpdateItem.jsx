import React from 'react';
import axios from 'axios';

class UpdateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
    };
  }

  handleEdit() {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  // handleChange() {
  // }

  handleSave() {
    const { edit } = this.state;
    axios.post('/api/chef/menu/update', {
      // updated items and menuItem Id
    })
      .then(() => {
        // update item in render? redirec?
        this.setState({ edit: !edit });
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
          <button type="button" onClick={this.handleEdit}>Edit</button>
          <br />
          <br />
        </div>
      );
    }
    return (
      <form key={item.id}>
        Image:
        <input defaultValue={item.imageUrl} />
        <br />
        Name:
        <input defaultValue={item.name} />
        <br />
        Price:
        <input defaultValue={item.price} />
        <br />
        Description:
        <input defaultValue={item.description} />
        <br />
        <button type="button" onClick={this.handleSave}>Save</button>
        <br />
        <br />
      </form>
    );
  }
}

export default UpdateItem;
