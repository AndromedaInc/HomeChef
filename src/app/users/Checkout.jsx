import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import client from '../../index';

const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($id: ID!) {
    updateTransaction(id: $id) {
      id
      status
      total
    }
  }
`;

class Checkout extends React.Component {
  constructor(props) {
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
  }

  handleSubmit() {
    const { user, transactionId } = this.props;
    const { createToken } = this.props.stripe;
    createToken({ name: user.name })
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
      })
      .then(() => {
        // update transaction to status paid
        console.log('setting transaction status to "paid"');
        client
          .mutate({
            mutation: UPDATE_TRANSACTION,
            variables: { id: transactionId },
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
      <div>
        {this.renderRedirect()}
        <h1>Your Reservation Summary</h1>
        <h3>
          {event.date}
          <br />
          {`${event.startTime} - ${event.endTime}`}
        </h3>
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
        <h1>Checkout</h1>
        <p>Please submit payment to save your reservation.</p>
        <form>
          <CardElement style={{ base: { fontSize: '18px' } }} />
          <br />
          <button
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
