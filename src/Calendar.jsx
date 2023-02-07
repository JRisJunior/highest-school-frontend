import React, {Component} from 'react';
// DayPilot Lite
import {DayPilot, DayPilotCalendar, dayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
    };
  }

  render() {
    const {...config} = this.state;
    return (
      <div>
        <DayPilotCalendar {...config}/>
      </div>
    );
  }
}

export default Calendar;