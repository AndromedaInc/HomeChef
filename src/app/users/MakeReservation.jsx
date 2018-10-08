import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemsWithUserRSVP: [],
      redirect: false,
    };
    this.onChange = this.onChange.bind(this);
    this.saveReservation = this.saveReservation.bind(this);
  }

  componentDidMount() {
    const { event } = this.props.location.state;
    const itemsWithUserRSVP = event.menuItems.slice();
    for (let i = 0; i < itemsWithUserRSVP.length; i += 1) {
      const item = itemsWithUserRSVP[i];
      item.maxOrder = item.quantity - item.reservations;
      itemsWithUserRSVP[i].userRSVP = 0;
    }
    this.setState({ menuItemsWithUserRSVP: itemsWithUserRSVP });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  decreaseCount(item) {
    const { menuItemsWithUserRSVP } = this.state;
    for (let i = 0; i < menuItemsWithUserRSVP.length; i += 1) {
      if (menuItemsWithUserRSVP[i].id === item.id && menuItemsWithUserRSVP[i].userRSVP > 0) {
        menuItemsWithUserRSVP[i].userRSVP -= 1;
      }
    }
    this.setState({ menuItemsWithUserRSVP });
  }

  increaseCount(item) {
    const { menuItemsWithUserRSVP } = this.state;
    for (let i = 0; i < menuItemsWithUserRSVP.length; i += 1) {
      const current = menuItemsWithUserRSVP[i];
      if (current.id === item.id && current.userRSVP < current.maxOrder) {
        menuItemsWithUserRSVP[i].userRSVP += 1;
      }
    }
    this.setState({ menuItemsWithUserRSVP });
  }

  saveReservation() {
    const { chef, event } = this.props.location.state;
    // TODO: this should:
    // 1) orders for each item
    // 2) a transaction (pending)
    // 3) correctly update itemEvent reservations
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
    const { menuItemsWithUserRSVP } = this.state;
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
        {menuItemsWithUserRSVP.map(item => (
          <div key={item.id}>
            <img width="300px" alt={item.name} src={item.imageUrl} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{`Price $${item.price}`}</p>
            {`How many dishes do you want?  ${item.userRSVP} `}
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
