import React, { Fragment, useMemo, useState } from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import {
  Calendar,
  Views,
  DateLocalizer,
  dateFnsLocalizer,
} from 'react-big-calendar';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});



export function BigCalendar() {

  // const events = [
  //   {
  //     title: "Big Meeting",
  //     start: new Date(2023, 1, 8),
  //     end: new Date(2023, 1, 9),
  //   },
  //   {
  //     title: "Vacation",
  //     start: new Date(2023, 1, 7),
  //     end: new Date(2023, 1, 10),
  //   },
  //   {
  //     title: "Conference",
  //     start: new Date(2023, 1, 10),
  //     end: new Date(2023, 1, 12),
  //   },
  // ];

  const [newEvent, setNewEvent] = useState({title: "", start: "", end: ""}); 
  const [allEvents, setAllEvents] = useState([]);

  let self = this;
  axios.get('http://localhost:3000/events.json').then(function (response) {
    console.log("response data");
    console.log(response.data);
    let appointments = response.data;
    for (let i = 0; i < appointments.length; i++) {
      console.log(appointments[i]);
      appointments[i].start = parse(appointments[i].start, new Date()).toString();
      appointments[i].end = parse(appointments[i].end, new Date()).toString();
    }
    console.log("appointments");
    console.log(appointments);
    setAllEvents(appointments);
  }).catch(function (error) {
    console.log(error);
  });

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
        <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
        <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                Add Event
        </button>
      </div>
      <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
    </div>
  );
}