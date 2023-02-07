import axios from "axios";
import { useState, useEffect } from "react";
import { EventsIndex } from "./EventsIndex";
import { EventsNew } from "./EventsNew";
import { EventsShow } from "./EventsShow";
import { Modal } from "./Modal";

export function Content() {

  // const events = [
  //   {id: 1, subject: "Networking", description: "you will reach out to someone you know", user_id: 1, start_time: "2022-01-01 10:00:00", end_time: "2022-01-01 11:00:00" },
  //   {id: 2, subject: "Gym", description: "You will workout", user_id: 1, start_time: "2022-01-01 12:00:00", end_time: "2022-01-01 13:00:00" }
  // ];

  const [events, setEvents] = useState([]);
  const [isEventsShowVisible, setIsEventsShowVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const handleIndexEvents = () => {
    console.log("handleIndexEvents");
    axios.get("http://localhost:3000/events.json").then((response) => {
      console.log(response.data);
      setEvents(response.data);
    });
  };

  const handleCreateEvent = (params, successCallback) => {
    console.log("handleCreateEvent", params);
    axios.post("http://localhost:3000/events.json", params).then((response) => {
      setEvents([...events, response.data]);
      successCallback();
    });
  };

  const handleShowEvent = (event) => {
    console.log("handleShowEvent", event);
    setIsEventsShowVisible(true);
    setCurrentEvent(event);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsEventsShowVisible(false);
  };

  useEffect(handleIndexEvents, []);

  return (
    <div>
      <EventsNew onCreateEvent={handleCreateEvent} />
      <Modal show={isEventsShowVisible} onClose={handleClose}>
        <EventsShow event={currentEvent} />
      </Modal>
      <EventsIndex events={events} onShowEvent={handleShowEvent} />
    </div>
  );
}