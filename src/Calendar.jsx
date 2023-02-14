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

  const [appointments, setAppointments] = React.useState([]);
  const [addedAppointment, setAddedAppointment] = React.useState({});

  const changeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
  };

  const commitChanges = ({ added, changed, deleted }) => {
    let newData = [...data.data];
    if (added) {
      const startingAddedId = newData > 0 ? newData [data.length - 1].id + 1 : 0;  
      newData = [...newData , { id: startingAddedId, ...added }];
    }
    setData(newData);
  };

  const handleIndexAppointments = () => {
    console.log("handleIndexAppointments");
    const getAppointments = async () => {
      const appointmentsFromServer = await fetchAppointments();
      console.log("appointmentsFromServer");
      console.log(appointmentsFromServer);
      setAppointments(appointmentsFromServer);
    };
    getAppointments();
  };

  const fetchAppointments = async() => {
    axios.get("http://localhost:3000/events.json").then((response) => {
      console.log(response.data);
      setAppointments(response.data);
    });
  };






  React.useEffect(handleIndexAppointments, []);

  return (
    <Paper>
      <Scheduler
        data={appointments} height={660}>
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