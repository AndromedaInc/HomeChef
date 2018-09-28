import React from 'react';
import ReactDOM from 'react-dom';
import CustomerHome from './components/ConsumerHome';
import { Router, Link } from '@reach/router';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customerUsername: '',
      customerPassword: '',
      chefUsername: '',
      chefPassword: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleCustomerSubmit = this.handleCustomerSubmit.bind(this);
    this.handleChefSubmit = this.handleChefSubmit.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  handleCustomerSubmit(e) {
    // e.preventDefault();
  }
  handleChefSubmit(e) {
    // e.preventDefault();
  }

  render() {
    return (
      <div>
        <h2>HomeChef</h2>
        <button>Login as Chef</button>{' '}
        <form onSubmit={this.handleCustomerSubmit}>
          <div className="customer-login">
            <h3>Login as a Customer</h3>
            <div>
              Username: <br />
              <input
                name="customerUsername"
                value={this.state.customerUsername}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Password: <br />
              <input
                name="customerPassword"
                value={this.state.customerPassword}
                type="password"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <form onSubmit={this.handleChefSubmit}>
          <div className="chef-login">
            <h3>Login as a Chef</h3>
            <div>
              Username: <br />
              <input
                name="chefUsername"
                value={this.state.chefUsername}
                onChange={this.handleChange}
              />
            </div>
            <div>
              Password: <br />
              <input
                name="chefPassword"
                value={this.state.chefPassword}
                type="password"
                onChange={this.handleChange}
              />
            </div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <CustomerHome />
      </div>
    );
  }
}
const { document } = global;
ReactDOM.render(<App />, document.getElementById('app'));
