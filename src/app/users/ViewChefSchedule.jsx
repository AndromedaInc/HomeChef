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
