import React, { useEffect, useState } from 'react';
import { listEvents } from '../EventService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AllEventComponent = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDate, setSearchDate] = useState(null);
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  async function fetchAllEvents() {
    try {
      const response = await listEvents();
      const sortedEvents = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setEvents(sortedEvents);
      setFilteredEvents(sortedEvents); // Set filtered events to all events initially
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  useEffect(() => {
    filterEvents();
  }, [searchQuery, searchDate, events]);

  function filterEvents() {
    let filtered = events;
    if (searchQuery) {
      filtered = filtered.filter((event) =>
        event.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (searchDate) {
      filtered = filtered.filter((event) => 
        new Date(event.date).toDateString() === searchDate.toDateString()
      );
    }
    setFilteredEvents(filtered);
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  function handleDateChange(date) {
    setSearchDate(date);
  }

  return (
    <div className="container">
      <h2 className="text-center">All Events</h2>
      <div className="mb-3">
        <input
          className="form-control border-primary"
          type="search"
          placeholder="Search by Event Name or Location"
          value={searchQuery}
          onChange={handleSearch}
        />
        <DatePicker
          selected={searchDate}
          onChange={handleDateChange}
          placeholderText="Search by date"
          className="form-control mt-2 border-primary"
          dateFormat="yyyy-MM-dd"
        />
      </div>
    
     <div className="card text-center border-primary">
     {filteredEvents.map((event) => (
       <div key={event.id} className="col" style={{ }}>
         <div className="card border-primary">
           <div className="card-body">
             <h1 className="card-title font-weight-bold">{event.eventName}</h1>  <br/>            
             <h4 className="card-text">Date: {new Date(event.date).toLocaleDateString()}</h4>
             <h5 className="card-text">Location : {event.location}</h5>
             <p className="card-text">Attendees : {event.attendees}</p>
             <a href={`/event/view-event/${event.id}`} className="btn btn-info">View Event Details</a>
           </div>
         </div>
       </div>
     ))}
      </div>
    </div>
  );
};

export default AllEventComponent;
