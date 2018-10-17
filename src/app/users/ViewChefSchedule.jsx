import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

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
              <td>{moment(event.date).format('ddd MMM. DD, YYYY')}</td>
              <td>{moment(event.startTime, 'HH:mm').format('h:mm a')}</td>
              <td>{moment(event.endTime, 'HH:mm').format('h:mm a')}</td>
              <td>
                <table>
                  <tbody>
                    <tr>
                      <th className="sub-table">Dish</th>
                      <th className="sub-table">Price</th>
                      <th className="sub-table">Quantity</th>
                    </tr>
                    {event.menuItems.map(item => (
                      <tr>
                        <td className="sub-table">{item.name}</td>
                        <td className="sub-table">
                          <span>$</span>
                          {(item.price).toFixed(2)}
                        </td>
                        <td className="sub-table">{item.quantity - item.reservations}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                <Link
                  to={{
                    pathname: '/user/chefschedule/reservation',
                    state: {
                      event, user, chef, userId: user.id,
                    },
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
