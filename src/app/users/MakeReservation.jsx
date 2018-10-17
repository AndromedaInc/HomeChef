import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import client from '../../index';

const CREATE_TRANSACTION = gql`
  mutation createTransaction($userId: ID!, $chefId: ID!) {
    createTransaction(userId: $userId, chefId: $chefId) {
      id
      status
      userId
      chefId
    }
  }
`;
const CREATE_ORDER = gql`
  mutation createOrder($itemEventId: ID!, $userId: ID!, $transactionId: ID!) {
    createOrder(itemEventId: $itemEventId, userId: $userId, transactionId: $transactionId) {
      id
      userId
      itemEventId
      transactionId
    }
  }
`;
const UPDATE_RESERVATIONS = gql`
  mutation updateItemEventReservations($itemEventId: ID!, $newReservationCount: Int) {
    updateItemEventReservations(itemEventId: $itemEventId, newReservationCount: $newReservationCount) {
      id
      reservations
      quantity
      eventId
      menuItemId
    }
  }
`;
class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItemsWithUserRSVP: [],
      redirect: false,
      transactionId: '',
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
    const { chef, user} = this.props.location.state;
    const { menuItemsWithUserRSVP } = this.state;
    // 1) create a transaction(pending)
    client
      .mutate({
        mutation: CREATE_TRANSACTION,
        variables: {
          userId: user.id,
          chefId: chef.id,
        },
      })
      .then((data) => {
        const transaction = data.data.createTransaction;
        this.setState({ transactionId: transaction.id });
      })
      .then(() => {
        const { transactionId } = this.state;
        menuItemsWithUserRSVP.forEach((item) => {
          const newCount = (item.userRSVP + item.reservations);
          // 2) create orders for each item
          for (let i = item.userRSVP; i > 0; i -= 1) {
            client
              .mutate({
                mutation: CREATE_ORDER,
                variables: {
                  itemEventId: item.itemEventId,
                  userId: user.id,
                  transactionId: transactionId,
                },
              });
          }
          // 3) correctly update itemEvent reservations
          client
            .mutate({
              mutation: UPDATE_RESERVATIONS,
              variables: {
                itemEventId: item.itemEventId,
                newReservationCount: newCount,
              },
            });
        });
      })
      .then(() => {
        // 4) open stripe checkout component for payment
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  }

  renderRedirect() {
    const { redirect, menuItemsWithUserRSVP, transactionId } = this.state;
    const { chef, user, event } = this.props.location.state;
    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/user/checkout',
            state: { chef, user, event, menuItemsWithUserRSVP, transactionId },
          }}
        />
      );
    }
  }

  render() {
    const { event, chef, user } = this.props.location.state;
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
            state: { username: user.username, chef },
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
