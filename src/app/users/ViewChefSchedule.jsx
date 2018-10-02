import React from 'react';
import { Link } from 'react-router-dom';
// import ApolloClient from 'apollo-boost';
// import { gql } from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';
// import { graphql } from 'react-apollo';
import axios from 'axios';
import sampleData from '../sampleData';


// const client = new ApolloClient({
//   uri: 'http://localhost:5678/graphql'
// }); // <ApolloProvider client={client}></ApolloProvider>

class ViewChefSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: sampleData,
      user: { id: 1, name: 'Jane Doe' }, // eventually will want to get user from prior component
      chefId: 1, // TODO this should be passed in as prop
    };
  }

  componentDidMount() {
    // this.getSchedule();
  }

  getSchedule() {
    const { id } = this.state; // change to passed in prop
    axios.get('/api/chef/schedule', { params: { id }})
      .then((data) => {
        console.log('data returned from axios get:', data);
        this.setState({ schedule: [] });
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
    const { schedule, user } = this.state;
    return (
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Menu Items</th>
          </tr>
          {schedule.map((event) => {
            return (
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
                      {event.menuItems.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                              <span>$</span>
                              {item.price}
                            </td>
                            <td>{item.quantity - item.reservations}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
                <td>
                  <Link to={{
                    pathname: '/user/chefschedule/reservation',
                    state: { event, user },
                    // props: { user },
                  }}>
                    <button type="button">Make Reservation</button>
                  </Link>
                </td>
              </tr>
            );
          })
          }
        </tbody>
      </table>
    );
  }
}

export default ViewChefSchedule;
