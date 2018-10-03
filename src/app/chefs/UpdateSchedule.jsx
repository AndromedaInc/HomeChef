import React from 'react';
import axios from 'axios';

class UpdateSchedule extends React.Component {
  constructor({ event, chefId }) {
    super({ event, chefId });
    this.state = {
      availableMenuItems: [],
      date: '',
      startTime: '',
      endTime: '',
      menuItems: [],
      newSchedule: true,
    };
  }

  componentDidMount() {
    const { event, chefId } = this.props;
    // if this event object is passed from ChefSchedule, update state
    if (event) {
      this.setState({
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        menuItems: event.menuItems,
        newSchedule: false,
      });
    }

    axios.get('/api/chef/menu', { params: { id: chefId } })
      .then((data) => {
        console.log(data);
        this.setState({ availableMenuItems: data.data });
      })
      .catch(err => console.log(err));
  }

  handleSubmit() {
    const { newSchedule } = this.state;
    if (newSchedule) {
      this.createNewEvent();
    } else {
      this.updateExistingEvent();
    }
  }

  createNewEvent() {
    axios.post('/api/chef/event', { params: { id: this.chefId } })
      .then((data) => {
        console.log(data);
        // TODO: add redirect back to chefschedule
      })
      .catch(err => console.log(err));
  }

  updateExistingEvent() {
    // update
  }

  render() {
    const {
      availableMenuItems,
      date,
      startTime,
      endTime,
      menuItems,
    } = this.state;
    return (
      <div>
        <h1>Update Your Schedule</h1>
        <form>
          Date:
          <input defaultValue={date} />
          <br />
          Start Time:
          <input defaultValue={startTime} />
          <br />
          End Time:
          <input defaultValue={endTime} />
          <br />
          <h3>What will you be serving?</h3>
          {availableMenuItems.map((item) => {
            let quantity = 0;
            for (let i = 0; i < menuItems.length; i++) {
              if (item.id === menuItems[i].id) {
                quantity = menuItems[i];
              }
            }
            return (
              <span key={item.id}>
                {item.name}
                <span>: </span>
                <input defaultValue={quantity} />
                <br />
              </span>
            );
          })}
          <button type="submit" onClick={this.handleSubmit.bind(this)}>Save</button>
        </form>

      </div>
    );
  }
}

export default UpdateSchedule;
