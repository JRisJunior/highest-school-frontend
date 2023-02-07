import React, {Component} from 'react';
// DayPilot Lite
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./CalendarStyles.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends Component {

  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: "Week",
      durationBarVisible: false,
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  render() {
    const {...config} = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={3}
            skipMonths={3}
            onTimeRangeSelected={ args => {
              console.log("You clicked: " + args.day);
              this.calendar.update({
                startDate: args.day
              });
            }}
            ref={this.calendarRef}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar {...config}
            ref={this.calendarRef}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;