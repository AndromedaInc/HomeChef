import React from 'react';
import Menu from './Menu';

class ConsumerChef extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div>
          Chef: Name
          {this.props.chefUsername}, Address: 1234 Easy St.
          {this.props.chefAddress}, Description: The best food you've ever had!{' '}
          {this.props.chefDescription}, Hours: 9pm-5am {this.props.chefHours}
        </div>

        <Menu />
      </div>
    );
  }
}
export default ConsumerChef;
