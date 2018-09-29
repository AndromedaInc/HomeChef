import React from 'react';
import axios from 'axios';

class UpdateSchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      startTime: '',
      endTime: '',
      meals: [], // include quantity for each meal
      newSchedule: true,
    };
  }

  componentDidMount() {
    // if this eventWithItem object is passed from ChefSchedule
      // update the state with that info
      // update new to false
    // else, skip this, start with an empty form to add new
    const { eventWithItems } = this.props;
    if (id) {
      axios.get
    }
  }

  handleSubmit() {
    const { newSchedule } = this.state;
    if (newSchedule) {
      // post request
    } else {
      // update existing
    }
  }

  render() {
    // triggered by add new event button from ChefSchedule
    // input form: 
      // date
      // start time
      // end time
      // meals avail (drop down)
      // quantity of each meal

    return (
      <div>
        
      </div>
    );
  }
}

export default UpdateSchedule;
