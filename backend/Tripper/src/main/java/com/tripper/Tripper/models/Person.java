package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    @JsonIgnore
    private String password;
    private String profilePic;

    public Person(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    @OneToMany(mappedBy = "person")
    @JsonManagedReference
    private List<Trip> trips = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    @JsonManagedReference(value = "favoriteReference")
    private List<Favorite> favoritePlaces = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    @JsonManagedReference
    private List<Flight> flights = new ArrayList<>();

    @OneToMany(mappedBy = "person")
//    @JsonManagedReference(value = "carRentalReference")
    private List<CarRental> carRentals = new ArrayList<>();

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<HotelReservation> hotelReservations = new ArrayList<>();

    public void addTrip(Trip trip) {
        this.trips.add(trip);
        trip.setPerson(this);
    }

    public Person setIdPersonFluently(Long idPerson) {
        this.setIdPerson(idPerson);
        return this;
    }

    public Person setFirstNameFluently(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public Person setLastNameFluently(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public Person setEmailFluently(String email) {
        this.setEmail(email);
        return this;
    }

    public Person setPasswordFluently(String password) {
        this.setPassword(password);
        return this;
    }

    public Person setProfilePictFluently(String profilePic) {
        this.setProfilePic(profilePic);
        return this;
    }

    public Person setTripstFluently(List<Trip> trips) {
        this.setTrips(trips);
        return this;
    }

    public Person setHotelReservationsFluently(List<HotelReservation> hotelReservations) {
        this.setHotelReservations(hotelReservations);
        return this;
    }

    public Person setFlightsFluently(List<Flight> flights) {
        this.setFlights(flights);
        return this;
    }

    public Person setCarRentalsFluently(List<CarRental> carRentals) {
        this.setCarRentals(carRentals);
        return this;
    }

    public Person setFavoritesFluently(List<Favorite> favoritePlaces) {
        this.setFavoritePlaces(favoritePlaces);
        return this;
    }

}
