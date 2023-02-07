export function EventsShow(props) {
  return (
    <div>
      <h1>Event information</h1>
      <p>Subject: {props.event.subject}</p>
      <p>Description: {props.event.description}</p>
      <p>Start time: {props.event.start_time}</p>
      <p>End time: {props.event.end_time}</p>
    </div>
  );
}