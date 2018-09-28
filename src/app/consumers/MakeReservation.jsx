import React from 'react';
import axios from 'axios';

class MakeReservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [],
      selection: '',
    };
  }

  componentDidMount() {
    // fetch times for this menu item
    // TODO: sort most recent first
    axios.get('/api/menu/availability', {
      params: {
        id: this.menuItem.id,
      },
    }).then((data) => {
      console.log(data);
      this.setState({ times: data });
    }).catch(err => console.log(err));
  }


  makeReservation() {
    const { selection } = this.state;
    const { user } = this.props;
    axios.post('/api/consumer/reservation', {
      id: user.id,
      selection,
    })
      .then(() => console.log('reservation saved'))
      .catch((err) => console.log(err));
  }

  makeSelection(e) {
    console.log(e.target);
    this.setState({ selection: e.target});
  }

  render() {
    const { times } = this.state;
    const { menuItem } = this.props;
    return (
      <div>
        <h3>{menuItem.name}</h3>
        <img alt={menuItem.name} src={menuItem.image} />
        <p>{menuItem.description}</p>
        {menuItem.price}
        <select onChange={this.makeSelection.bind(this)}>
          {times.map((time) => {
            return (
              <option key="time.id">
                {time.date}
                at
                {time.start}
                -
                {time.end}
              </option>
            );
          })
          }
        </select>
        <button type="submit" onClick={this.makeReservation}>Make Reservation</button>
      </div>
    );
  }
}

export default MakeReservation;
