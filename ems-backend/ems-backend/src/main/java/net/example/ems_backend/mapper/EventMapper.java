package net.example.ems_backend.mapper;

import net.example.ems_backend.dto.EventDto;
import net.example.ems_backend.entity.Event;

public class EventMapper {

    public static EventDto mapToEventDto(Event event){
        return new EventDto(
                event.getId(),
                event.getEventName(),
                event.getDescription(),
                event.getDate(),
                event.getLocation(),
                event.getAttendees()
        );
    }

    public static Event maptoEvent(EventDto eventDto){
        return new Event(
                eventDto.getId(),
                eventDto.getEventName(),
                eventDto.getDescription(),
                eventDto.getDate(),
                eventDto.getLocation(),
                eventDto.getAttendees()
        );
    }
}
