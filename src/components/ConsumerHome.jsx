import React from 'react';
import CustomerChef from './CustomerChef';
import axios from 'axios';
class CustomerHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cooks: []
    };
  }
  componentDidMount() {
    axios.get('/api/cooks', (req, res) => {});
  }
  render() {
    return (
      <div>
        <h2>HomeChef</h2>
        <CustomerChef />
      </div>
    );
  }
}
export default CustomerHome;
