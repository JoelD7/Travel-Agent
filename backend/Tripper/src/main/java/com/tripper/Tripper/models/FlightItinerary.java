package com.tripper.Tripper.models;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
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
public class FlightItinerary implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idFlightItinerary")
    private Long idFlightItinerary;

    private String duration;

    @ManyToOne
    @JoinColumn(name = "idFlight")
    private Flight flight;

    @OneToMany(mappedBy = "flightItinerary")
    List<FlightSegment> segments = new ArrayList<>();
}
