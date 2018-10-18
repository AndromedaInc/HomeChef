import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import client from '../../index';
import { GET_TRANSACTIONS } from './UserTransactions';

const CREATE_TRANSACTION = gql`
  mutation createTransaction(
    $userId: ID!, 
    $chefId: ID!, 
    $total: Float, 
    $tax: Float, 
    $fee: Float, 
    $status: String
  ) {
    createTransaction(
      userId: $userId, 
      chefId: $chefId,
      total: $total,
      tax: $tax,
      fee: $fee, 
      status: $status,
    ) {
      id
      userId
      chefId
      total
      tax
      fee
      status
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

class Checkout extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'HomeChef Transaction Total',
        amount: props.total, // in subunit (aka cents)
      },
      displayItems: [
        { amount: props.subtotal, label: 'subtotal' },
        { amount: props.tax, label: 'tax' },
        { amount: props.fee, label: 'fee' },
      ],
    });

    paymentRequest.canMakePayment().then((result) => {
      this.setState({ canMakePayment: !!result });
    });

    paymentRequest.on('token', ({ complete, token, ...data }) => {
      console.log('Received Stripe token: ', token);
      console.log('Received customer information: ', data);
      complete('success');
    });

    this.state = {
      redirect: false,
      canMakePayment: false,
      paymentRequest,
    };
    console.log('in checkout state', this.state);
    console.log('in checkout props', this.props);
  }

  handleSubmit() {
    const {
      menuItems,
      chef,
      user,
      total,
      tax,
      fee,
    } = this.props;
    const { createToken } = this.props.stripe;
    createToken({ name: user.name })
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
      })
      .then(() => {
        const totalInDollars = (total / 10).toFixed(2);
        const taxInDollars = (tax / 10).toFixed(2);
        const feeInDollars = (fee / 10).toFixed(2);
        // 1) create a transaction
        client
          .mutate({
            mutation: CREATE_TRANSACTION,
            variables: {
              userId: user.id,
              chefId: chef.id,
              total: totalInDollars,
              tax: taxInDollars,
              fee: feeInDollars,
              status: 'paid',
            },
          })
          .then((data) => {
            const transaction = data.data.createTransaction;
            menuItems.forEach((item) => {
              const newCount = (item.userRSVP + item.reservations);
              // 2) create orders for each item
              for (let i = item.userRSVP; i > 0; i -= 1) {
                client
                  .mutate({
                    mutation: CREATE_ORDER,
                    variables: {
                      itemEventId: item.itemEventId,
                      userId: user.id,
                      transactionId: transaction.id,
                    },
                    refetchQueries: [{
                      query: GET_TRANSACTIONS,
                      variables: { userOrChefId: user.id, userOrChef: 'user' },
                    }],
                  });
              }
              // 3) update itemEvent reservations
              client
                .mutate({
                  mutation: UPDATE_RESERVATIONS,
                  variables: {
                    itemEventId: item.itemEventId,
                    newReservationCount: newCount,
                  },
                });
            });
          });
      })
      .then(() => {
        console.log('setting redirect');
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  }

  renderRedirect() {
    const { user } = this.props;
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/user/transactions',
            state: { user },
          }}
        />
      );
    }
  }

  render() {
    const { subtotal, tax, fee, total, menuItems, event } = this.props;
    return (
      <div className="grid-wide">
        {this.renderRedirect()}
        <h1>Your Reservation Summary</h1>
        <h2>
          {moment(event.date).format('ddd, MMM. DD, YYYY')}
          <br />
          {`${moment(event.startTime, 'HH:mm').format('h:mm a')} - ${moment(event.endTime, 'HH:mm').format('h:mm a')}`}
        </h2>
        {menuItems.map((item) => {
          if (item.userRSVP > 0) {
            return (
              <div key={item.id}>
                {`${item.name} (${item.userRSVP})   $${(item.price * item.userRSVP).toFixed(2)}`}
                <br />
              </div>
            );
          }
        })}
        <br />
        {`Subtotal   $${(subtotal / 10).toFixed(2)}`}
        <br />
        {`Tax   $${(tax / 10).toFixed(2)}`}
        <br />
        {`Fee   $${(fee / 10).toFixed(2)}`}
        <h3>{`Total   $${(total / 10).toFixed(2)}`}</h3>
        <h2>Checkout</h2>
        <p>Please submit payment to save your reservation.</p>
        <form>
          <CardElement style={{ base: { fontSize: '18px' } }} />
          <br />
          <button
            className="highlight"
            type="button"
            onClick={this.handleSubmit.bind(this)}
          >
            Submit Payment
          </button>
        </form>
      </div>
    );
  }
}

export default injectStripe(Checkout);
