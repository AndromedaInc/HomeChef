import React from 'react';
import axios from 'axios';

class UpdateSchedule extends React.Component {
  constructor({ /* event, chefId */ }) {
    super({ /* event, chefId */ });
    this.state = {
      availableMenuItems: [],
      date: '',
      startTime: '',
      endTime: '',
      menuItems: [],
      updatedMenuItems: [],
      newSchedule: true,
      // chefId: this.props.location.state,
      // event: this.props.location.state,
      chefId: 1, // DELETE
      event: { id: 1, date: '2018/10/31', startTime: '4:00 PM', endTime: '6:00 PM', menuItems: [{ id: 1, name: 'Pad Thai', quantity: 20 }, { id: 21, name: 'Pad See Ew', quantity: 10 }] },
    };
  }

  componentDidMount() {
    const { chefId, event } = this.state; // CHANGE TO THIS.PROPS
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
        this.setState({ availableMenuItems: data.data });
      })
      .catch(err => console.log(err));
  }

  handleQuantityChange(item, event) {
    const newQty = event.target.value;
    // const { updatedMenuItems } = this.state;
    // const tempMenuItems = updatedMenuItems.slice();
    const tempMenuItems = this.state.updatedMenuItems.slice(); // DO NOT CHANGE
    for (let i = 0; i < tempMenuItems.length; i += 1) {
      if (tempMenuItems[i].id === item.id) {
        tempMenuItems.splice(i, 1);
      }
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
    const {
      date,
      startTime,
      endTime,
      updatedMenuItems,
      chefId, // CHANGE TO PROPS
    } = this.state;
    axios.post('/api/chef/event/create', {
      chefId,
      date,
      startTime,
      endTime,
      updatedMenuItems,
    })
      .then((data) => {
        console.log(data);
        // TODO: add redirect back to chefschedule
      })
      .catch(err => console.log(err));
  }

  updateExistingEvent() {
    const {
      event,
      chefId, // CHANGE TO PROPS
      date,
      startTime,
      endTime,
      updatedMenuItems,
    } = this.state;
    console.log('updatedMenuItems in update existing event', updatedMenuItems);
    axios.post('/api/chef/event/update', {
      id: event.id,
      chefId,
      date,
      startTime,
      endTime,
      updatedMenuItems,
    })
      .then((data) => {
        console.log(data);
        // TODO: add redirect back to chefschedule
      })
      .catch(err => console.log(err));
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
          <input
            defaultValue={date}
            onChange={e => this.setState({ date: e.target.value })}
          />
          <br />
          Start Time:
          <input
            defaultValue={startTime}
            onChange={e => this.setState({ startTime: e.target.value })}
          />
          <br />
          End Time:
          <input
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
