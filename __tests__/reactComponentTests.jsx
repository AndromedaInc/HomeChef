import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../src/Header';
// import App from '../src/app/app';
// import ChefAuth from '../src/app/auth/ChefAuth';
// import Stripe from '../src/app/users/Stripe';
// import UserTransactions from '../src/app/users/UserTransactions';
// import UserHome from '../src/app/users/UserHome';

configure({ adapter: new Adapter() });

/* **** Snapshots **** */
it('Header renders correctly', () => {
  const tree = renderer
    .create(<Header />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// it('App renders correctly', () => {
//   const tree = renderer
//     .create(<App />)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

/* **** Component Testing **** */
describe('Header', () => {
  it('should have logo', () => {
    const wrapper = mount(<Header />);
    const logo = wrapper.find('#logo');
    expect(logo.length).toBe(1);
  });
});

// describe('ChefAuth', () => {
//   it('should have chef-login class', () => {
//     const wrapper = mount(<ChefAuth />);
//     const chefLogin = wrapper.find('.chef-login');
//     expect(chefLogin.length).toBe(1);
//   });
// });

// describe('UserHome', () => {
//   it('should have a map container', () => {
//     const wrapper = shallow(<UserHome />);
//     const map = wrapper.find('MapContainer');
//     expect(map.length).toEqual(1);
//   });
// });

// describe('Stripe', () => {
//   it('should have a Checkout component', () => {
//     const wrapper = shallow(<Stripe />);
//     const checkout = wrapper.find('Checkout');
//     expect(checkout.length).toEqual(1);
//   });
//   it('should have a StripeProvider component', () => {
//     const wrapper = mount(<Stripe />);
//     const stripeProvider = wrapper.find('StripeProvider');
//     expect(stripeProvider.length).toEqual(1);
//   });
// });

// describe('UserTransactions', () => {
//   it('should have an upcoming reservations component', () => {
//     const wrapper = mount(<UserTransactions />);
//     const upcoming = wrapper.find('UpcomingReservations');
//     expect(upcoming.length).toEqual(1);
//   });
// });
