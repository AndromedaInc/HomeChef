import React from 'react';
// import axios from 'axios';

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    console.log('props is', props); // Stephen @Sarah: I console-logged props to show what we're working with when reaching this component via a React Router
    this.state = {
      order: {},
      // event: props.location.state.event,
      // user: props.location.state.user,
      // chef: props.location.state.chef,
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
      .catch(err => console.log(err));
  }

  increaseCount() {
  }

  decreaseCount() {
  }

  render() {
    const { event, user, chef } = this.props.location.state; // Stephen @ Sarah: this was formally "this.state"; when using React router and passing in state you can access what you passed in at this.props.location.state; this Stack Overflow has some related information: https://stackoverflow.com/questions/41466055/how-do-i-pass-state-through-react-router
    console.log('event is', event, 'chef is', chef);
    return (
      <div>
        hi
        <h1>{chef.name}</h1>
        <h2>
          {event.date}
          <span />
          {event.startTime}
          <span> - </span>
          {event.endTime}
        </h2>
        {event.menuItems.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <img alt={item.name} src={item.image} />
            <p>{item.description}</p>
            {item.price}
            <button type="button" onClick={this.increaseCount.bind(this, item)}>+</button>
            <button type="button" onClick={this.decreaseCount.bind(this, item)}>-</button>
          </div>
        ))}
        <h2>Save Your Reservation</h2>
        <p>add date, items, etc</p>
        <button type="submit" onClick={this.saveReservation}>Save</button>
      </div>
    );
  }
}

export default MakeReservation;
