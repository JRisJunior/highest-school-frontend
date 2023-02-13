import * as React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';


// const events = [
//   { startDate: '2023-02-13T09:45', endDate: '2023-02-13T11:00', title: 'Meeting' },
//   { startDate: '2023-02-13T12:00', endDate: '2023-02-13T13:30', title: 'Go to a gym' },
// ];

export function Calendar() {

  const [events, setEvents] = useState([
    { startDate: '2023-02-13T09:45', endDate: '2023-02-13T11:00', title: 'Meeting' },
    { startDate: '2023-02-13T12:00', endDate: '2023-02-13T13:30', title: 'Go to a gym' },
  ]);

  const handleIndexEvents = () => {
    console.log("handleIndexEvents");
    axios.get("http://localhost:3000/events.json").then((response) => {
      console.log(response.data);
      setEvents(response.data);
    });
  };

  useEffect(handleIndexEvents, []);


  return (
    <Paper>
      <Scheduler
        data={events}
      >
        <ViewState/>
        <WeekView
          startDayHour={1}
          endDayHour={23}
        />
        <Appointments />
      </Scheduler>
    </Paper>
  );
}