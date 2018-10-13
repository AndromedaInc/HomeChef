import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { Redirect } from 'react-router-dom';
import gql from 'graphql-tag';
import moment from 'moment';
import client from '../../index';

const UPDATE_TRANSACTION = gql`
  mutation updateTransaction($id: ID!, $total: Float, $tax: Float, $fee: Float) {
    updateTransaction(id: $id, total: $total, tax: $tax, fee: $fee) {
      id
      status
      total
      tax
      fee
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
    const { user, transactionId, total, tax, fee } = this.props;
    const { createToken } = this.props.stripe;
    createToken({ name: user.name })
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
      })
      .then(() => {
        // update transaction to status paid
        const totalInDollars = (total / 10).toFixed(2);
        const taxInDollars = (tax / 10).toFixed(2);
        const feeInDollars = (fee / 10).toFixed(2);
        client
          .mutate({
            mutation: UPDATE_TRANSACTION,
            variables: {
              id: transactionId,
              total: totalInDollars,
              tax: taxInDollars,
              fee: feeInDollars,
            },
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
            state: { userId: user.id },
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
