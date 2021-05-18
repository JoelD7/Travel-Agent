package com.tripper.Tripper.models;

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
    private List<Favorite> favoritePlaces = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<Flight> flights = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<CarRental> carRentals = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<HotelReservation> hotelReservations = new ArrayList<>();

    @OneToMany(mappedBy = "person")
    private List<Trip> trips = new ArrayList<>();

}
