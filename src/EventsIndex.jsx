export function EventsIndex(props) {

  return (
    <div>
      <h1>All events</h1>
      {props.events.map((event) => (
        <div key={event.id}>
          <h2>Subject: {event.title}</h2>
          <p>Description: {event.description}</p>
          <li>Start time: {event.startDate}</li>
          <li>End time: {event.endDate}</li>
          <button onClick={() => props.onShowEvent(event)}>More info</button>
        </div>
      ))}
    </div>
  );
}