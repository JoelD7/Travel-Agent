package com.tripper.Tripper.models;

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
public class FlightSegment {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idFlightSegment")
    private Long idFlightSegment;
    private String duration;
    private String carrierCode;

    @ManyToOne
    @JoinColumn(name = "idFlightItinerary")
    private FlightItinerary flightItinerary;

    @OneToMany(mappedBy = "flightSegment")
    List<PlaceRelation> placeRelations = new ArrayList<>();

}
