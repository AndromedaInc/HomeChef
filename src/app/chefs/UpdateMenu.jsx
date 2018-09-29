import React from 'react';
import axios from 'axios';

class UpdateMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [],
    };
  }

  componentDidMount() {
    // get request for all menu items for this chef id
  }

  handleChange() {
    
  }

  handleSubmit() {
  }

  render() {
    // triggered by add new event button from ChefSchedule

    // button to add new menu item
    // show each meal with option to edit each one:
      // name
      // description
      // price
      // image

    return (
      <div>
      </div>
    );
  }
}

export default UpdateMenu;
