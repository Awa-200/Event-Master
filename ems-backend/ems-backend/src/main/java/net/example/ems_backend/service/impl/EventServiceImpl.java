package net.example.ems_backend.service.impl;

import net.example.ems_backend.dto.EventDto;
import net.example.ems_backend.entity.Event;
import net.example.ems_backend.exception.ResourceNotFoundException;
import net.example.ems_backend.mapper.EventMapper;
import net.example.ems_backend.repository.EventRepository;
import net.example.ems_backend.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;

    @Autowired
    private EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public EventDto CreateEvent(EventDto eventDto) {


        Event event = EventMapper.maptoEvent(eventDto);
        Event savedEvent = eventRepository.save(event);
        return EventMapper.mapToEventDto(savedEvent);
    }

    @Override
    public EventDto getEventById(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event is not exist with given id : " + eventId));

        return EventMapper.mapToEventDto(event);
    }

    @Override
    public List<EventDto> getAllEvents() {
        List<Event> events = eventRepository.findAll();
        return events.stream().map((event) ->EventMapper.mapToEventDto(event))
                .collect(Collectors.toList());
    }

    @Override
    public EventDto updateEvent(Long eventId, EventDto updatedEvent) {


        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("Event is not exists with given id: " +eventId)
        );

        event.setEventName(updatedEvent.getEventName());
        event.setDescription(updatedEvent.getDescription());
        event.setDate(updatedEvent.getDate());
        event.setLocation(updatedEvent.getLocation());
        event.setAttendees(updatedEvent.getAttendees());

        Event updatedEventObj = eventRepository.save(event);

        return EventMapper.mapToEventDto(updatedEventObj);
    }

    @Override
    public void deleteEvent(Long eventId) {

        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("Event is not exists with given id: " +eventId)
        );

        eventRepository.deleteById(eventId);

    }
}
