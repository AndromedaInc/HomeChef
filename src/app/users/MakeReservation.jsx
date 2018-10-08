import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      order: {},
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.saveReservation = this.saveReservation.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  decreaseCount() {
    const { quantity } = this.state;
    if (quantity > 1) {
      this.setState({
        quantity: quantity - 1,
      });
    }
  }

  increaseCount() {
    const { quantity } = this.state;
    this.setState({
      quantity: quantity + 1,
    });
  }

  saveReservation() {
    const { chef, event } = this.props.location.state;
    const { quantity } = this.state;
    // TODO: this should also create:
    // 1) orders for each item
    // 2) a transaction (pending)
    // TODO: open stripe component for payment
    axios
      .post('/api/user/reservation', {
        id: event.eventId,
        menuItem: event.menuItems[0],
        chefId: chef.id,
        quantity,
      })
      .then(() => {
        console.log('reservation saved');
        this.setState({
          redirect: true,
        });
      })
      .catch(err => console.log(err));
  }

  renderRedirect() {
    const { redirect } = this.state;
    const { chef, user } = this.props.location.state;
    if (redirect) {
      return (
        <Redirect
          to={{
            pathname: '/user/chefdetails',
            state: { username: user.username, chef },
          }}
        />
      );
    }
  }

  render() {
    const { event, chef } = this.props.location.state;
    const { quantity } = this.state;
    return (
      <div>
        {this.renderRedirect()}

        <h1>{`${chef.name}`}</h1>
        <h2>
          {event.date}
          <span />
          {event.startTime}
          <span> - </span>
          {event.endTime}
        </h2>
        {event.menuItems.map(item => (
          <div key={item.id}>
            <img width="300px" alt={item.name} src={item.imageUrl} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{`Price $${item.price}`}</p>
            {`How many dishes do you want?  ${quantity} `}
            <button type="button" onClick={this.increaseCount.bind(this, item)}>
              +
            </button>
            <button type="button" onClick={this.decreaseCount.bind(this, item)}>
              -
            </button>
            <br />
            <br />
          </div>
        ))}
        <button type="submit" onClick={this.saveReservation}>
          Save Reservation
        </button>
      </div>
    );
  }
}

export default MakeReservation;
