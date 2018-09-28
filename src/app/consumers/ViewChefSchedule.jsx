import React from 'react';
import axios from 'axios';

class ViewChefSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemEvents: [], // TODO: itemEvents should be events for a chef id
      // with an array of menu item objs including quantity 
      // [{id: 1, date: 9/18/18, starttime: 12:00, endtime: 1:00, 
      // menuItems: [{name, quantity, id, desc, etc}]}]
    };
  }

  componentDidMount() {
    // fetch events & menuItems for this chef id
    axios.get('/api/chef/items-events', {
      params: {
        id: this.menuItem.id,
      },
    }).then((data) => {
      console.log(data);
      this.setState({ itemEvents: data });
    }).catch(err => console.log(err));
  }

  handleReservation(eventId, itemId){
    // redirect to MakeReservation component
  }


  render() {
    const { itemEvents } = this.state;
    return (
      <div>
        <button onClick={this.handleEditEvent}>Add New Event</button>
        <button onClick={this.handleEditMenu}>Edit Menu Items</button>
        {itemEvents.map((event) => {
          return (
            <div key={event.id}>
              {event.date}
              {event.startTime} - {event.endTime}
              {event.menuItems.map((item) {
                return (
                  <div key={item.id}>
                    {item.name}
                    {item.price}
                    {item.quantity}
                  </div>
                );
              })}
              <button onClick={this.handleReservation.bind(this, event.id, item.id)}>Reserve</button>
            </div>
          );
        })
        }
      </div>
    );
  }
}

export default ViewChefSchedule;