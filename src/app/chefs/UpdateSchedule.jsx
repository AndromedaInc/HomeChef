import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class UpdateSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      availableMenuItems: [],
      date: '',
      startTime: '',
      endTime: '',
      menuItems: [],
      updatedMenuItems: [],
      newSchedule: true,
    };
  }

  componentDidMount() {
    this.getEventDetails();
  }

  getEventDetails() {
    const { chefId, event } = this.props.location.state;
    if (event) {
      this.setState({
        redirect: false,
        date: event.date,
        startTime: event.startTime,
        endTime: event.endTime,
        menuItems: event.menuItems,
        newSchedule: false,
      }, () => this.render());
    }
    axios.get('/api/chef/menu', { params: { id: chefId } })
      .then((data) => {
        this.setState({ availableMenuItems: data.data });
      })
      .catch(err => console.log(err));
  }

  handleQuantityChange(item, event) {
    const newQty = event.target.value;
    const { updatedMenuItems } = this.state;
    const tempMenuItems = updatedMenuItems.slice();
    for (let i = 0; i < tempMenuItems.length; i += 1) {
      if (tempMenuItems[i].id === item.id) { tempMenuItems.splice(i, 1); }
    }
    tempMenuItems.push({ id: item.id, quantity: newQty });
    this.setState({ updatedMenuItems: tempMenuItems });
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
    const { chefId } = this.props.location.state;
    const {
      date,
      startTime,
      endTime,
      updatedMenuItems,
    } = this.state;
    axios.post('/api/chef/event/create', {
      chefId,
      date,
      startTime,
      endTime,
      updatedMenuItems,
    })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  }

  updateExistingEvent() {
    const { chefId, event } = this.props.location.state;
    const {
      date,
      startTime,
      endTime,
      updatedMenuItems,
    } = this.state;
    axios.post('/api/chef/event/update', {
      id: event.eventId,
      chefId,
      date,
      startTime,
      endTime,
      updatedMenuItems,
    })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { chefId } = this.props.location.state;
    const {
      redirect,
      availableMenuItems,
      date,
      startTime,
      endTime,
      menuItems,
    } = this.state;

    if (redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/chef',
            state: { chefId },
          }}
        />
      );
    }
    return (
      <div>
        <h1>Update Your Schedule</h1>
        <form>
          Date:
          <input
            name="date"
            type="date"
            defaultValue={date}
            onChange={e => this.setState({ date: e.target.value })}
          />
          <br />
          Start Time:
          <input
            name="startTime"
            type="time"
            defaultValue={startTime}
            onChange={e => this.setState({ startTime: e.target.value })}
          />
          <br />
          End Time:
          <input
            name="endTime"
            type="time"
            defaultValue={endTime}
            onChange={e => this.setState({ endTime: e.target.value })}
          />
          <br />
          <h3>What will you be serving?</h3>
          {availableMenuItems.map((item) => {
            let quantity = 0;
            for (let i = 0; i < menuItems.length; i += 1) {
              if (item.id === menuItems[i].id) {
                const qty = menuItems[i].quantity;
                quantity = qty;
              }
            }
            return (
              <span key={item.id}>
                {item.name}
                <span>: </span>
                <input
                  type="number"
                  min="0"
                  defaultValue={quantity}
                  onChange={this.handleQuantityChange.bind(this, item)}
                />
                <br />
              </span>
            );
          })}
          <button type="button" onClick={this.handleSubmit.bind(this)}>Save</button>
        </form>

      </div>
    );
  }
}

export default UpdateSchedule;
