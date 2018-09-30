import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import sampleData from '../sampleData';

class ChefSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: sampleData,
    };
  }

  componentDidMount() {
    // fetch events & menuItems for this chef id
    // axios.get('/api/chef/items-events', {
    //   params: {
    //     id: this.menuItem.id,
    //   },
    // }).then((data) => {
    //   console.log(data);
    //   this.setState({ itemEvents: data });
    // }).catch(err => console.log(err));
  }

  handleEditMenu(){
    // redirect to UpdateMenu component
  }

  handleEditEvent(e, eventId){
    // redirect to UpdateSchedule
    
      // if it is an edit (not add new), 
        // pass this particular itemEvent obj
  }

  render() {
    const { schedule } = this.state;
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
                        <th>Total Quantity</th>
                        <th>Reservations</th>
                      </tr>
                      {event.menuItems.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>
                              <span>$</span>
                              {item.price}
                            </td>
                            <td>{item.quantity}</td>
                            <td>{item.reservations}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
                <td>
                  <Link to={{
                    pathname: '/chef/updateschedule',
                    state: { event },
                  }}>
                    <button type="button">Edit</button>
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

export default ChefSchedule;