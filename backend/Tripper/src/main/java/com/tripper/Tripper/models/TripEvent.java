package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tripper.Tripper.models.enums.TripEventType;
import java.time.LocalDate;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Event")
public class TripEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idEvent")
    private Long idEvent;

    private String name;
    private String location;

    @Enumerated(EnumType.STRING)
    private TripEventType type;
    private Boolean includesTime;
    private LocalDate start;
    private LocalDate end;

    public TripEvent(String name, String location, TripEventType type, Boolean includesTime,
            LocalDate start, LocalDate end) {
        this.name = name;
        this.location = location;
        this.type = type;
        this.includesTime = includesTime;
        this.start = start;
        this.end = end;
    }

    @ManyToOne
    @JoinColumn(name = "idTrip")
    @JsonBackReference(value = "tripReference")
    private Trip trip;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idEvent")
    private Restaurant restaurant;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "event")
    @JsonManagedReference(value = "flightReference")
    private Flight flight;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idEvent")
    @JsonManagedReference(value = "carReference")
    private CarRental carRental;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "event")
    @JoinColumn(name = "idEvent")
    @JsonManagedReference(value = "hotelReference")
    private HotelReservation hotelReservation;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idEvent")
    @JsonManagedReference(value = "poiReference")
    private POI poi;
}
