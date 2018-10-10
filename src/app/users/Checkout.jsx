import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

class Checkout extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in checkout:', props);

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Transaction Total',
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
      canMakePayment: false,
      paymentRequest,
    };
  }

  handleSubmit() {
    const { user } = this.props;
    const { createToken } = this.props.stripe;
    createToken({ name: user.name }).then(({ token }) => {
      console.log('Received Stripe token:', token);
    });
    // TODO: link to a confirmation page
    // TODO: update transaction to 'paid'
  }

  render() {
    const { subtotal, tax, fee, total, menuItems, event } = this.props;
    return (
      <div>
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
