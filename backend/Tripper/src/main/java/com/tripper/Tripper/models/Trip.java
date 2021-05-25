package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idTrip")
    private Long idTrip;

    private String name;
    private String countries;
    private Double budget;
    private LocalDate startDate;
    private LocalDate endDate;
    @Lob
    private byte[] coverPhoto;

    @ManyToOne
    @JoinColumn(name = "idPerson")
    @JsonBackReference
    private Person person;

    public Trip(String name, String countries, Double budget, LocalDate startDate, LocalDate endDate
    ) {
        this.name = name;
        this.countries = countries;
        this.budget = budget;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @OneToMany(mappedBy = "trip")
    private List<Album> albums = new ArrayList<>();

    @OneToMany(mappedBy = "trip")
    @JsonManagedReference(value = "tripReference")
    private List<TripEvent> itinerary = new ArrayList<>();
}
