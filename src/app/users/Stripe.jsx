import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';
import Checkout from './Checkout';

class Stripe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stripe: null,
      subtotal: 0,
      tax: 0,
      fee: 0,
      total: 0,
    };
  }

  componentWillMount() {
    // publishable stripe key
    this.setState({ stripe: window.Stripe('pk_test_UL6LDXRUR7wsokZY49L6ccmb') });
    this.getTotals();
  }

  getTotals() {
    // Stripe wants money in currency subunits (aka cents)
    const { menuItemsWithUserRSVP } = this.props.location.state;
    let subtotal = 0;
    menuItemsWithUserRSVP.forEach((item) => {
      subtotal += (item.userRSVP * item.price );
    });
    subtotal *= 10;
    const tax = +(subtotal * 0.0925).toFixed(0);
    const fee = +(subtotal * 0.05).toFixed(0);
    const total = subtotal + tax + fee;
    this.setState({ subtotal, tax, fee, total });
  }

  render() {
    const { stripe, subtotal, tax, fee, total } = this.state;
    const { chef, user, event, menuItemsWithUserRSVP, transactionId } = this.props.location.state;
    return (
      <div className="grid-subcontainer">
        <StripeProvider stripe={stripe}>
          <Elements>
            <Checkout
              stripe={stripe}
              chef={chef}
              user={user}
              event={event}
              menuItems={menuItemsWithUserRSVP}
              subtotal={subtotal}
              tax={tax}
              fee={fee}
              total={total}
              transactionId={transactionId}
            />
          </Elements>
        </StripeProvider>
      </div>
    );
  }
}

export default Stripe;
