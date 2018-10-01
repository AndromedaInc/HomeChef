import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import sampleData from '../sampleData';

class ViewChefSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: sampleData,
      user: { id: 1, name: 'Jane Doe' }, // eventually will want to get user from prior component
    };
  }

  componentDidMount() {
    // this.getSchedule();
  }

  // getSchedule() {
  //   const chef = { this.props };
  //   graphql.get(`/gql/chef/schedule?query={chefSchedule(id:${chef.id}) {
  //     eventId
  //     date (sort by date?)
  //     startTime (then by time?)
  //     endTime
  //     menuItems {
  //       menuItemId
  //       name
  //       description
  //       imageUrl
  //       price
  //       remainingQuantity
  //     }
  //   }}`)
  //   .then( schedule => this.setState({ schedule }))
  //   .catch( err => console.log(err));
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
