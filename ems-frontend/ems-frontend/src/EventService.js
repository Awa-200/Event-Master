import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/events';

export const listEvents = () => axios.get(REST_API_BASE_URL);

export const createEvent = (event) => axios.post(REST_API_BASE_URL, event);

export const getEvent = (eventId) => axios.get(`${REST_API_BASE_URL}/${eventId}`);

export const updateEvent = (eventId, event) => {
  console.log('Sending PUT request to update event:', event);
  return axios.put(`${REST_API_BASE_URL}/${eventId}`, event);
};

export const deleteEvent = (eventId) => axios.delete(`${REST_API_BASE_URL}/${eventId}`);
