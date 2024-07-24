package net.example.ems_backend.service;

import net.example.ems_backend.dto.EventDto;

import java.util.List;

public interface EventService {

    EventDto CreateEvent(EventDto eventDto);

    EventDto getEventById(Long eventId);

    List<EventDto> getAllEvents();

    EventDto updateEvent(Long eventId, EventDto updatedEvent);

    void deleteEvent(Long eventId);
}
