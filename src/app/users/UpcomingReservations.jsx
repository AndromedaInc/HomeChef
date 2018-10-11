import React from 'react';

class UpcomingReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upcomingEvents: [],
    };
  }

  componentWillMount() {
    this.getUpcomingEvents();
  }

  getUpcomingEvents() {
    const data = this.props;
    const transactions = data.data;
    const userEvents = [];
    for (let i = 0; i < transactions.length; i += 1) {
      const today = new Date();
      let eventDate = transactions[i].orders[0].itemEvent.event.date;
      eventDate = eventDate.split('-').join(',');
      const date = new Date(eventDate);
      if (date > today) {
        userEvents.push(transactions[i]);
      }
    }
    this.setState({ upcomingEvents: userEvents });
  }

  render() {
    const { upcomingEvents } = this.state;
    return (
      <div>
        <h2>Upcoming Reservations</h2>

        {upcomingEvents.map((transaction) => {
          const { event } = transaction.orders[0].itemEvent;
          const { chef } = transaction;
          return (
            <div key={transaction.id}>
              {event.date}
              <br />
              {`${event.startTime} - ${event.endTime}`}
              <br />
              {chef.name}
              <br />
              {`${chef.streetAddress}, ${chef.city}, ${chef.stateName} ${chef.zip}`}
              <br />
              Your Order:
              <br />
              <ul>
                {transaction.orders.map((order) => {
                  return (
                    <li key={order.id}>
                      {order.itemEvent.menuItem.name}
                    </li>
                  );
                })}
              </ul>
              <br />
              <br />
            </div>
          );
        })}
      </div>
    );
  }
}

export default UpcomingReservations;
