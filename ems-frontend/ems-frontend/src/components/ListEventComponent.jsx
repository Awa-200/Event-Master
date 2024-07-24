import React, { useEffect, useState } from 'react';
import { deleteEvent, listEvents } from '../EventService';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const ListEventComponent = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getAllEvents();
  }, []);

  function getAllEvents() {
    listEvents()
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewEvent() {
    navigate('add-event');
  }

  function updateEvent(id) {
    navigate(`update-event/${id}`);
  }

  function viewEvent(id) {
    navigate(`view-event/${id}`);
  }

  function removeEvent(id) {
    console.log(id);

    deleteEvent(id)
      .then((response) => {
        getAllEvents();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleDateChange(date) {
    setSearchDate(date);
  }

  const filteredEvents = events.filter((event) => {
    const matchesQuery = 
      event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = searchDate ? new Date(event.date).toDateString() === searchDate.toDateString() : true;
    return matchesQuery && matchesDate;
  });

  function truncateText(text, maxWords) {
    const words = text.split(' ');
    if (words.length <= maxWords) {
      return text;
    }
    return words.slice(0, maxWords).join(' ') + '...';
  }

  return (
    <div className='container'>
      <h2 className='text-center'>List of Events</h2>
      <div className='mb-2'>
        <button className="btn btn-outline-primary" onClick={addNewEvent}>Add Event</button>
        <input
          type="text"
          placeholder="Search by event name or location"
          className="form-control mt-2 border-primary"
          value={searchQuery}
          onChange={handleSearchChange}
          
        />
        <DatePicker
          selected={searchDate}
          onChange={handleDateChange}
          placeholderText="Search by date"
          className="form-control mt-2 border-primary"
          dateFormat="YYYY-MM-DD"
        />
      </div>
      <table className='table table-bordered border-primary'>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Location</th>
            <th>Attendees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event.id}>
              <td>{truncateText(event.eventName, 3)}</td>
              <td>{truncateText(event.description, 3)}</td>
              <td>{event.date}</td>
              <td>{truncateText(event.location, 1)}</td>
              <td>{truncateText(event.attendees, 2)}</td>
              <td>
                <button className="btn btn-outline-success" onClick={() => updateEvent(event.id)}>Update</button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeEvent(event.id)}
                  style={{ marginLeft: '1rem' }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-dark"
                  onClick={() => viewEvent(event.id)}
                  style={{ marginLeft: '1rem', marginRight: '1rem' }}
                >
                  View Event
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEventComponent;
