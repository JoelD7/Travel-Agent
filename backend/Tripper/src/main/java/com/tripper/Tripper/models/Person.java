package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Person implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPerson")
    private Long idPerson;

    private String firstName;
    private String lastName;
    private String email;
    private String password;

    @OneToMany(mappedBy = "person")
    @JsonManagedReference
    private List<Trip> trips = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<Favorite> favoritePlaces = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    @JsonManagedReference
    private List<Flight> flights = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<CarRental> carRentals = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<HotelReservation> hotelReservations = new ArrayList<>();

    public void addTrip(Trip trip) {
        this.trips.add(trip);
        trip.setPerson(this);
    }
}
