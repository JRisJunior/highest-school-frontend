import * as React from 'react';
// import { useState, useEffect } from "react";
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';


// const events = [
//   { startDate: '2023-02-13T09:45', endDate: '2023-02-13T11:00', title: 'Meeting' },
//   { startDate: '2023-02-13T12:00', endDate: '2023-02-13T13:30', title: 'Go to a gym' },
// ];

export function Calendar() {

  const [events, setEvents] = React.useState([]);
  const [addedAppointment, setAddedAppointment] = React.useState({});

  const handleIndexEvents = () => {
    console.log("handleIndexEvents");
    axios.get("http://localhost:3000/events.json").then((response) => {
      console.log(response.data);
      setEvents(response.data);
    });
  };





  // const handleCreateEvent = (params, successCallback) => {
  //   console.log("handleCreateEvent", params);
  //   axios.post("http://localhost:3000/events.json", params).then((response) => {
  //     setEvents([...events, response.data]);
  //     successCallback();
  //   });
  // };



  React.useEffect(handleIndexEvents, []);


  return (
    <Paper>
      <Scheduler
        data={events} height={window.innerHeight}>
        <ViewState />
        <EditingState />
        <IntegratedEditing />
        <WeekView startDayHour={7} endDayHour={20} />
        <ConfirmationDialog />
        <Appointments />
        <AppointmentTooltip showOpenButton showDeleteButton/>
      </Scheduler>
    </Paper>
  );
}