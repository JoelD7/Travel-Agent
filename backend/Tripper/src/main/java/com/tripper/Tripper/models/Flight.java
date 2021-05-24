package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tripper.Tripper.models.enums.FlightClass;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
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
import javax.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Flight implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idFlight")
    private Long idFlight;

    @ManyToOne
    @JoinColumn(name = "idPerson")
    @JsonBackReference
    private Person person;

    @Enumerated(EnumType.STRING)
    private FlightClass flightClass;
    private Double total;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<FlightItinerary> itineraries = new ArrayList<>();
}
