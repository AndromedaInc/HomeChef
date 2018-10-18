import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import moment from 'moment';

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemsWithUserRSVP: [],
      redirect: false,
    };
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
    this.setState({ redirect: true });
  }

  renderRedirect() {
    const { redirect, menuItemsWithUserRSVP } = this.state;
    const {
      chef, user, event, latitude, longitude,
    } = this.props.location.state;
    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/user/checkout',
            state: {
              chef, user, event, menuItemsWithUserRSVP, latitude, longitude,
            },
          }}
        />
      );
    }
  }

  render() {
    const {
      event, chef, user, latitude, longitude,
    } = this.props.location.state;
    const { menuItemsWithUserRSVP } = this.state;
    return (
      <div>
        {this.renderRedirect()}

        <h1>{`${chef.name}`}</h1>
        <h2>
          {moment(event.date).format('ddd, MMM. DD, YYYY')}
          <br />
          {`${moment(event.startTime, 'HH:mm').format('h:mm a')} - ${moment(event.endTime, 'HH:mm').format('h:mm a')}`}
        </h2>
        {menuItemsWithUserRSVP.map(item => (
          <div key={item.id}>
            <img width="300px" alt={item.name} src={item.imageUrl} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{`Price $${(item.price).toFixed(2)}`}</p>
            <p>{`Quantity Available: ${item.maxOrder}`}</p>
            {'How many dishes do you want?   '}
            <strong>{item.userRSVP}</strong>
            <button className="adjustCount" type="button" onClick={this.increaseCount.bind(this, item)}>
              +
            </button>
            <button className="adjustCount" type="button" onClick={this.decreaseCount.bind(this, item)}>
              -
            </button>
            <br />
            <br />
          </div>
        ))}
        <button className="highlight" type="submit" onClick={this.saveReservation}>
          Save Reservation
        </button>
        <Link
          to={{
            pathname: '/user/chefdetails',
            state: {
              user, chef, latitude, longitude,
            },
          }}
        >
          <button type="submit">
            Cancel
          </button>
        </Link>
      </div>
    );
  }
}

export default MakeReservation;
