import React, { useState, useEffect } from "react";
import { createEvent, getEvent, updateEvent } from "../EventService";
import { useNavigate, useParams } from "react-router-dom";

const EventComponent = () => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [attendees, setAttendees] = useState("");

  const { id } = useParams();
  const [errors, setErrors] = useState({
    eventName: "",
    description: "",
    date: "",
    location: "",
    attendees: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getEvent(id)
        .then((response) => {
          setEventName(response.data.eventName);
          setDescription(response.data.description);
          setDate(response.data.date);
          setLocation(response.data.location);
          setAttendees(response.data.attendees);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateEvent(e) {
    e.preventDefault();

    if (validateForm()) {
      const event = { eventName, description, date, location, attendees };
      console.log(event);

      if (id) {
        updateEvent(id, event)
          .then((response) => {
            console.log(response.data);
            navigate("/event");
          })
          .catch((error) => {
            console.error(error);
          });
          
      } else {
        createEvent(event)
          .then((response) => {
            console.log(response.data);
            navigate("/event");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (eventName.trim()) {
      errorsCopy.eventName = "";
    } else {
      errorsCopy.eventName = "Event Name is required";
      valid = false;
    }

    if (description.trim()) {
      errorsCopy.description = "";
    } else {
      errorsCopy.description = "Description is required";
      valid = false;
    }

    if (date.trim()) {
      errorsCopy.date = "";
    } else {
      errorsCopy.date = "Date is required";
      valid = false;
    }

    if (location.trim()) {
      errorsCopy.location = "";
    } else {
      errorsCopy.location = "Location is required";
      valid = false;
    }

    if (attendees.trim()) {
      errorsCopy.attendees = "";
    } else {
      errorsCopy.attendees = "Attendees is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h3 className="text-center">Update Event</h3>;
    } else {
      return <h3 className="text-center">Add Event</h3>;
    }
  }

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3  border-primary ">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Event Name:</label>
                <input
                  type="text"
                  placeholder="Event Name"
                  name="eventName"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className={`form-control border-primary${
                    errors.eventName ? "is-invalid" : ""
                  }`}
                />
                {errors.eventName && (
                  <div className="invalid-feedback">{errors.eventName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`form-control border-primary ${
                    errors.description ? "is-invalid" : ""
                  }`}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Date:</label>
                <input
                  type="date"
                  placeholder="Date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`form-control border-primary ${errors.date ? "is-invalid" : ""}`}
                />
                {errors.date && (
                  <div className="invalid-feedback">{errors.date}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Location:</label>
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`form-control border-primary ${
                    errors.location ? "is-invalid" : ""
                  }`}
                />
                {errors.location && (
                  <div className="invalid-feedback">{errors.location}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Attendees:</label>
                <input
                  type="text"
                  placeholder="Attendees"
                  name="attendees"
                  value={attendees}
                  onChange={(e) => setAttendees(e.target.value)}
                  className={`form-control border-primary ${
                    errors.attendees ? "is-invalid" : ""
                  }`}
                />
                {errors.attendees && (
                  <div className="invalid-feedback">{errors.attendees}</div>
                )}
              </div>
              <br/>
              <button className="btn btn-outline-success" onClick={saveOrUpdateEvent}>
                Save Event
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
