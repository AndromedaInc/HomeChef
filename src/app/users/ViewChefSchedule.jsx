import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ViewChefSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [],
    };
    this.getSchedule = this.getSchedule.bind(this);
  }

  componentDidMount() {
    this.getSchedule(this.props.chef);
  }

  getSchedule(chef) {
    axios
      .get('/api/chef/schedule', { params: { id: chef.id } })
      .then((data) => {
        this.setState({ schedule: data.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { schedule } = this.state;
    const { user, chef } = this.props;
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
            <tr>
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
                      <tr>
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
