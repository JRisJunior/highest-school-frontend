import * as React from 'react';
// import { useState, useEffect } from "react";
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  ViewSwitcher,
  Toolbar,
} from '@devexpress/dx-react-scheduler-material-ui';


// const events = [
//   { startDate: '2023-02-13T09:45', endDate: '2023-02-13T11:00', title: 'Meeting' },
//   { startDate: '2023-02-13T12:00', endDate: '2023-02-13T13:30', title: 'Go to a gym' },
// ];

export function Calendar() {

  const [appointments, setAppointments] = React.useState([]);
  const [appointmentsUpdated, setAppointmentsUpdated] = React.useState(0);
  const [addedAppointment, setAddedAppointment] = React.useState({});
  const [appointmentChanges, setAppointmentChanges] = React.useState({});
  const [editingAppointment, setEditingAppointment] = React.useState(undefined);
  const [data, setData] = React.useState([]);

  const changeAddedAppointment = (addedAppointment) => {
    setAddedAppointment(addedAppointment);
  };

  const changeAppointmentChanges = (appointmentChanges) => {
    setAppointmentChanges(appointmentChanges);
  };

  const changeEditingAppointment = (editingAppointment) => {
    setEditingAppointment(editingAppointment);
  };

  // const handleSetAppointments = () => {
  //   console.log("handleIndexAppointments");
  //   const getAppointments = async () => {
  //     const appointmentsFromServer = await fetchAppointments();
  //     setAppointments(appointmentsFromServer);
  //   };
  //   getAppointments();
  //   console.log("appointmentsFromServer");
  // };

  React.useEffect(() => {
    const fetchAppointments = async () => {
      const response = await axios.get("http://localhost:3000/events.json");
      console.log(response.data);
      setAppointments(response.data);
    };
    fetchAppointments();
  }, [appointmentsUpdated]);
  
     
  
 

  // const commitChanges = ({ added, changed, deleted }) => {
  //   setAppointments(() => {
  //     console.log("commitChanges appointments");
  //     console.log(...data);
  //     let { appointments } = appointments;
  //     if (added) {
  //       const startingAddedId = appointments > 0 ? appointments [appointments.length - 1].id + 1 : 0;  
  //       appointments = [...appointments , { id: startingAddedId, ...added }];
  //     }
  //   });
  // };

  const commitChanges = ({ added, changed, deleted }) => {
    let updatedData = [...data];

    if (added) {
      const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
      updatedData = [...updatedData, { id: startingAddedId, ...added }];
      const appointmentData = { "subject": added.title, "description": added.notes, "start_time": new Date(added.startDate), "end_time": new Date(added.endDate), "allDay": added.allDay };
      addAppointment(appointmentData);
    }

    if (changed) {
      updatedData = updatedData.map((appointment) =>
        changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment
      );
    }

    if (deleted !== undefined) {
      updatedData = updatedData.filter((appointment) => appointment.id !== deleted);
    }

    console.log(data);
    console.log(updatedData);
    console.log(added);
    console.log('commiting changes!!!');

    // call addAppointment with data we just created(appointment)


    setData(updatedData);
  };
  
  // supposed to do the POST request to add appointment on backend
  const addAppointment = async (appointment) => {
    console.log("addAppointment", appointment);
    const startingAddedId = appointments.length > 0 ? appointments[appointments.length - 1].id + 1 : 0;
    appointment.id = startingAddedId;
    axios.post("http://localhost:3000/events.json", appointment).then((response) => {
      setAppointments([...appointments, response.data]);
    });
    setAppointmentsUpdated(appointmentsUpdated + 1);
  };


  // React.useEffect(handleSetAppointments, []);

  return (
    <div  id="highest-school-schedule">
      <h1>Highest School Schedule</h1>
      <Paper>
        <Scheduler
          data={appointments} height={660}>
          <ViewState
            defaultCurrentDate="2023-04-10"
            defaultCurrentViewName="Week" />
          <EditingState
            onCommitChanges={commitChanges}
            addedAppointment={addedAppointment}
            onAddedAppointmentChange={changeAddedAppointment}
            appointmentChanges={appointmentChanges}
            onAppointmentChangesChange={changeAppointmentChanges}
            editingAppointment={editingAppointment}
            onEditingAppointmentChange={changeEditingAppointment}/>
          <WeekView startDayHour={8} endDayHour={18} />
          <DayView startDayHour={8} endDayHour={18} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <ViewSwitcher />
          <ConfirmationDialog />
          <Appointments />
          <AppointmentTooltip showOpenButton showDeleteButton/>
          <AppointmentForm />
        </Scheduler>
      </Paper>
    </div>
  );
}