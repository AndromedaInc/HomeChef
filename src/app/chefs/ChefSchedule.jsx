import React from 'react';
import axios from 'axios';

class ChefSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemEvents: [], // TODO: itemEvents should be events 
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

  handleEditMenu(){
    // redirect to UpdateMenu component
  }

  handleEditEvent(e, eventId){
    // redirect to UpdateSchedule
    
      // if it is an edit (not add new), 
        // pass this particular itemEvent obj
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
                    {item.name} //TODO: make this a link to view/edit menuItem?
                    {item.price}
                    {item.quantity}
                  </div>
                );
              })}
              <button onClick={this.handleEditEvent.bind(this, event.id)}>Edit</button>
            </div>
          );
        })
        }
      </div>
    );
  }
}

export default ChefSchedule;