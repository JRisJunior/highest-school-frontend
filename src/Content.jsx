import axios from "axios";
import { useState, useEffect } from "react";
import { EventsIndex } from "./EventsIndex";

export function Content() {

  // const events = [
  //   {id: 1, subject: "Networking", description: "you will reach out to someone you know", user_id: 1, start_time: "2022-01-01 10:00:00", end_time: "2022-01-01 11:00:00" },
  //   {id: 2, subject: "Gym", description: "You will workout", user_id: 1, start_time: "2022-01-01 12:00:00", end_time: "2022-01-01 13:00:00" }
  // ];

  const [events, setEvents] = useState([]);

  const handleIndexEvents = () => {
    console.log("handleIndexEvents");
    axios.get("http://localhost:3000/events.json").then((response) => {
      console.log(response.data);
      setEvents(response.data);
    });
  };

  useEffect(handleIndexEvents, []);

  return (
    <div>
      <EventsIndex events={events} />
    </div>
  );
}