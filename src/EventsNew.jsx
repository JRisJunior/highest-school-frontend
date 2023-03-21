export function EventsNew(props) {

  const handleSubmit = (event) => {
    event.preventDefault();
    const params = new FormData(event.target);
    props.onCreateEvent(params, () => event.target.reset());
    console.log(params);
  };

  return (
    <div>
      <h1>New Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          Subject: <input name="subject" type="text" />
        </div>
        <div>
          Description: <input name="description" type="text" />
        </div>
        <div>
          Start time: <input name="start_time" type="datetime-local" />
        </div>
        <div>
          End time: <input name="end_time" type="datetime-local" />
        </div>
        <button type="submit">Create event</button>
      </form>
    </div>
  );
}