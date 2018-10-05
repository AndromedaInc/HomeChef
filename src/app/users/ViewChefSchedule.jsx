import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import ApolloClient from 'apollo-boost';
// import { gql } from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
// import { graphql } from 'react-apollo';

// const client = new ApolloClient({
//   uri: 'http://localhost:5678/graphql'
// }); // <ApolloProvider client={client}></ApolloProvider>

class ViewChefSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
    };
    this.getSchedule = this.getSchedule.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      const { user, chef } = this.props;
      this.setState({
        user,
        chef,
      });
      this.getSchedule(chef);
    }, 400);
  }

  getSchedule(chef) {
    axios
      .get('/api/chef/schedule', { params: { id: chef.id } })
      .then((data) => {
        this.setState({ schedule: data.data });
      })
      .catch(err => console.log(err));
  }

  // getSchedule() {
  //   const chef = { this.props };
  //   //graphql.get(`/gql/chef/schedule?query={chefSchedule(id:${chef.id}) {
  //   const schedule = gql`
  //     {
  //       chefSchedule {
  //         eventId
  //         date ${ /* sort by date? */ }
  //         startTime ${ /* then by time? */ }
  //         endTime
  //         menuItems {
  //           menuItemId
  //           name
  //           description
  //           imageUrl
  //           price
  //           remainingQuantity
  //         }
  //       }
  //     }
  //   }}`;
  //   // .then( schedule => this.setState({ schedule }))
  //   // .catch( err => console.log(err));
  // }

  render() {
    const { schedule, user, chef } = this.state;
    return (
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Menu Items</th>
          </tr>
          {schedule.map(event => (
            <tr key={event.id}>
              <td>{event.date}</td>
              <td>{event.startTime}</td>
              <td>{event.endTime}</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <th>Dish</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                    {event.menuItems.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>
                          <span>$</span>
                          {item.price}
                        </td>
                        <td>{item.quantity - item.reservations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                <Link
                  to={{
                    pathname: '/user/chefschedule/reservation',
                    state: { event, user, chef },
                  }}
                >
                  <button type="button">Make Reservation</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ViewChefSchedule;
