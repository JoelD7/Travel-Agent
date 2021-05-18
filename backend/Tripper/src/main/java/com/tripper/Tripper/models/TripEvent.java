package com.tripper.Tripper.models;

import com.tripper.Tripper.models.enums.TripEventType;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
    private TripEventType type;
    private Boolean includesTime;
    private LocalDate start;
    private LocalDate end;

    @OneToOne
    @JoinColumn(name = "idEvent")
    private Restaurant restaurant;

    @OneToOne
    @JoinColumn(name = "idEvent")
    private Flight flight;

    @OneToOne
    @JoinColumn(name = "idEvent")
    private CarRental carRental;

    @OneToOne
    @JoinColumn(name = "idEvent")
    private HotelReservation hotelReservation;

    @OneToOne
    @JoinColumn(name = "idEvent")
    private POI poi;
}
