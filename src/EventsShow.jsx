export function EventsShow(props) {

  const handleClick = () => {
    props.onDestroyEvent(props.event);
  };  

  return (
    <div>
      <h1>Event information</h1>
      <p>Subject: {props.event.title}</p>
      <p>Description: {props.event.description}</p>
      <p>Start time: {props.event.startDate}</p>
      <p>End time: {props.event.endDate}</p>
      <hr />
      <button onClick={handleClick}>Destroy Event</button>
    </div>
  );
}