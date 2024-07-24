package net.example.ems_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="events")

public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //data base auto increment
    private Long id;

    @Column(name = "event_name", nullable = false)
    private String eventName;
    @Column(name = "description")
    private String description;
    @Column(name = "date")
    private LocalDate date;
    @Column(name = "location")
    private String location;
    @Column(name = "attendees")
    private String attendees;
}
