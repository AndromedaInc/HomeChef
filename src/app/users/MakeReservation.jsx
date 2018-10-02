import React from 'react';
// import axios from 'axios';

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: {},
    };
  }

  componentDidMount() {
    // all data coming from ViewChefSchedule - don't need to query
  }

  saveReservation() {
    const { event, user } = this.props;
    axios.post('/api/consumer/reservation', {
      id: user.id,
      selection,
    })
      .then(() => console.log('reservation saved'))
      .catch((err) => console.log(err));
  }

  increaseCount() {
  }
  
  decreaseCount() {
  }

  render() {
    const { event, user, chef } = this.state;
    return (
      <div>
        hi
        <h1>{chef.name}</h1>
        <h2>
          {event.date}
          <span> </span>
          {event.startTime}
          <span> - </span>
          {event.endTime}
        </h2>
        {event.menuItems.map((item) => {
          return (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <img alt={item.name} src={item.image} />
              <p>{item.description}</p>
              {item.price}
              <button type="button" onClick={this.increaseCount.bind(this, item)}>+</button>
              <button type="button" onClick={this.decreaseCount.bind(this, item)}>-</button>
            </div>
          );
        })}
        <h2>Save Your Reservation</h2>
        <p>add date, items, etc</p>
        <button type="submit" onClick={this.saveReservation}>Save</button>
      </div>
    );
  }
}

export default MakeReservation;
