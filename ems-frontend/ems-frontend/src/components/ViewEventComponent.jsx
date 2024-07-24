import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEvent, updateEvent } from '../EventService';


const ViewEventComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({});
  const [newAttendee, setNewAttendee] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getEvent(id)
      .then((response) => {
        const eventData = response.data;
        setEvent(eventData);
      })
      .catch((error) => {
        console.error('Error fetching event data:', error);
      });
  }, [id]);

  const handleAttendeeChange = (e) => {
    setNewAttendee(e.target.value);
  };

  const handleUpdateAttendees = () => {
    if (newAttendee.trim() === '') {
      setError('Attendee field cannot be empty');
      return;
    }

    const updatedEvent = { 
      ...event, 
      attendees: event.attendees ? `${event.attendees}, ${newAttendee}` : newAttendee 
    };

    updateEvent(id, updatedEvent)
      .then((response) => {
        setEvent(response.data);
        setNewAttendee('');
        setError('');
        alert('Attendees updated successfully');
      })
      .catch((error) => {
        console.error('Error updating attendees:', error);
      });
  };

  //register for event

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Replace "YOUR_ACCESS_KEY_HERE"
    formData.append("access_key", "1fccd6b1-b5f3-40eb-b89f-a982e01ddb3e");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <div className="container">
      <h1>View Event</h1>
      <div className="card border-primary">
        <div className="card-body">
          <h1 className="card-title">{event.eventName}</h1>
          <h4 className="card-subtitle mb-2 ">Date: {event.date}</h4>
          <h5 className="card-text">Description: {event.description}</h5>
          <p className="card-text">Location: {event.location}</p>
          <p className="card-text"> Attendees: {event.attendees}</p>
          
        </div>
      </div><br/>
      <div className="containerwe  ">
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <h2 className="mb-4 text-center">Attendee Register</h2>
          <form onSubmit={onSubmit} className="p-4 border rounded border-primary mb-3">
          <div className="form-group mb-2">
            <label className="form-label">Attendee Name</label>
            <input
              type="text"
              value={newAttendee}
              onChange={handleAttendeeChange}
              className={`form-control border-primary ${error ? 'is-invalid' : ''}`}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
         
         
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="email" className="form-label">Your Email address</label>
              <input type="email" className="form-control border-primary" id="email" name="email" />
            </div>
            <div className="mb-3 border-primary mb-3">
              <label htmlFor="telephone" className="form-label">Telephone Number</label>
              <input type="telephone" className="form-control border-primary" id="telephone" name="telephone" />
            </div>
            
            <button type="submit" className="btn btn-outline-success" onClick={handleUpdateAttendees}>Register</button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewEventComponent;
