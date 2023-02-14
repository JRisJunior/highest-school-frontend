import * as React from 'react';
// import { useState, useEffect } from "react";
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
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
  const [appointmentChanges, setAppointmentChanges] = React.useState({});
  const [editingAppointment, setEditingAppointment] = React.useState(undefined);

  const changeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    setAppointmentChanges(appointmentChanges);
  };

  const changeEditingAppointment = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  const handleSetAppointments = () => {
    // console.log("handleIndexAppointments");
    const getAppointments = async () => {
      const appointmentsFromServer = await fetchAppointments();
      setAppointments(appointmentsFromServer);
    };
    getAppointments();
    // console.log("appointmentsFromServer");
  };

  const fetchAppointments = async () => {
    axios.get("http://localhost:3000/events.json").then((response) => {
      // console.log(response.data);
      setAppointments(response.data);
    });
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setAppointments(() => {
      console.log("commitChanges appointments");
      console.log(...data);
      let { appointments } = appointments;
      if (added) {
        const startingAddedId = appointments > 0 ? appointments [appointments.length - 1].id + 1 : 0;  
        appointments = [...appointments , { id: startingAddedId, ...added }];
      }
    });
  };
  
  // supposed to do the POST request to add appointment on backend
  const addAppointment = async (appointment, successCallback) => {
    console.log("addAppointment", appointment);
    const startingAddedId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
    appointment.id = startingAddedId;
    axios.post("http://localhost:3000/events.json", appointment).then((response) => {
      setAppointments([...appointments, response.data]);
      successCallback();
    });
  };


  React.useEffect(handleSetAppointments, []);

  return (
    <div  id="highest-school-schedule">
      <h1>Highest School Schedule</h1>
      <Paper>
        <Scheduler
          data={appointments} height={660}>
          <ViewState />
          <EditingState
            // onCommitChanges={commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={changeEditingAppointment}/>
          <WeekView startDayHour={8} endDayHour={18} />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton/>
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </div>
  );
}