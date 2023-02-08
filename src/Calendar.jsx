import React, {Component} from 'react';
import { useState, useEffect } from "react";
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
      cellHeight: 30,
      dayBeginsHour: 6,
      dayEndsHour: 21,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("What subject are you learning today?:", "Subject 1");
        dp.clearSelection();
        if (!modal.result) {
          return;
        }
        dp.events.add({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result
        });
      },
      eventDeleteHandling: "Update",
      onEventClick: async args => {
        const dp = this.calendar;
        const modal = await DayPilot.Modal.prompt("Update event text:", args.e.text());
        if (!modal.result) {
          return;
        }
        const e = args.e;
        e.data.text = modal.result;
        dp.events.update(e);
      },
    };
    console.log("color from constructor");
    console.log(this.props.color);
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {

    const events = this.calendar.events.load("http://localhost:3000/events.json", function success(args) {
      console.log("events index pull to calendar");
      console.log(args.data);
      args.preventDefault();
    });
    // const events = [
    //   {
    //     id: 1,
    //     text: "Event 1",
    //     start: "2023-02-07T10:30:00",
    //     end: "2023-02-07T13:00:00"
    //   },
    //   {
    //     id: 2,
    //     text: "Event 2",
    //     start: "2023-02-08T09:30:00",
    //     end: "2023-02-08T11:30:00",
    //     backColor: "#6aa84f"
    //   },
    //   {
    //     id: 3,
    //     text: "Event 3",
    //     start: "2023-02-08T12:00:00",
    //     end: "2023-02-08T15:00:00",
    //     backColor: "#f1c232"
    //   },
    //   {
    //     id: 4,
    //     text: "Event 4",
    //     start: "2023-02-06T11:30:00",
    //     end: "2023-02-06T14:30:00",
    //     backColor: "#cc4125"
    //   },
    // ];
    // const events = [];

    console.log("color from mount");
    console.log(this.props.color);

    const startDate = DayPilot.Date.today();

    this.calendar.update({startDate, events});

  }

  render() {
    const {...config} = this.state;
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={2}
            skipMonths={2}
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
          {console.log("color from render")}
          {console.log(this.props.color)}
        </div>
      </div>
    );
  }
}

export default Calendar;