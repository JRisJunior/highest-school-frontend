export function EventsIndex(props) {

  return (
    <div>
      <h1>All events</h1>
      {props.events.map((event) => (
        <div key={event.id}>
          <h2>Subject: {event.subject}</h2>
          <p>Description: {event.description}</p>
          <li>Start time: {event.start_time}</li>
          <li>End time: {event.end_time}</li>
        </div>
      ))}
    </div>
  );
}