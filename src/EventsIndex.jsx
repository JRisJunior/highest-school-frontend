export function EventsIndex(props) {

  return (
    <div>
      <h1>All events</h1>
      {props.events.map((event) => (
        <div key={event.id}>
          <h2>Subject: {event.text}</h2>
          <p>Description: {event.description}</p>
          <li>Start time: {event.start}</li>
          <li>End time: {event.end}</li>
          <button onClick={() => props.onShowEvent(event)}>More info</button>
        </div>
      ))}
    </div>
  );
}