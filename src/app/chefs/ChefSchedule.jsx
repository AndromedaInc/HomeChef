import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

class ChefSchedule extends React.Component {
  constructor({ chefId }) {
    super({ chefId });
    this.state = {
      schedule: [],
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.getSchedule();
    }, 300);
  }

  getSchedule() {
    const { chefId } = this.props;
    console.log('1 chefId', chefId);
    axios.get('/api/chef/schedule', { params: { id: chefId } })
      .then((data) => {
        console.log(data.data)
        // save chefId to state to prevent unknown switching to different chefId number in render
        this.setState({ schedule: data.data, chefId });
      })
      .catch(err => console.log(err));
  }

  render() {
    // get chefId from state (set in getSchedule) to prevent unknown switch to diff chefId num
    const { schedule, chefId } = this.state;
    console.log('2 chefId', chefId);

    return (
      <div className="grid-wide">
        <h2>Schedule</h2>
        <Link to={{
          pathname: '/chef/schedule/update',
          state: { chefId },
        }}
        >
          <button type="button">Add New Event</button>
        </Link>
        <Link to={{
          pathname: '/chef/menu/update',
          state: { chefId },
        }}
        >
          <button type="button">Update Menu</button>
        </Link>

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
                <tr key={event.eventId}>
                  <td>{moment(event.date).format('ddd. MMM. DD, YYYY')}</td>
                  <td>{moment(event.startTime, 'HH:mm').format('h:mm a')}</td>
                  <td>{moment(event.endTime, 'HH:mm').format('h:mm a')}</td>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <th className="sub-table">Dish</th>
                          <th className="sub-table">Price</th>
                          <th className="sub-table">Total Quantity</th>
                          <th className="sub-table">Reservations</th>
                        </tr>
                        {event.menuItems.map((item) => {
                          return (
                            <tr key={item.id} >
                              <td className="sub-table">{item.name}</td>
                              <td className="sub-table">
                                <span>$</span>
                                {(item.price).toFixed(2)}
                              </td>
                              <td className="sub-table">{item.quantity}</td>
                              <td className="sub-table">{item.reservations}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </td>
                  <td>
                    <Link to={{
                      pathname: '/chef/schedule/update',
                      state: { event, chefId },
                    }}
                    >
                      <button type="button">Edit</button>
                    </Link>
                  </td>
                </tr>
              );
            })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export default ChefSchedule;
