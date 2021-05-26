package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tripper.Tripper.models.enums.FlightClass;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
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
import javax.persistence.OneToOne;
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

    @OneToOne
    @JoinColumn(name = "idEvent")
    @JsonBackReference(value = "flightReference")
    private TripEvent event;

    @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL)
    private List<FlightItinerary> itineraries = new ArrayList<>();

    //<editor-fold defaultstate="collapsed" desc="comment">
    /*
     * Persists a Flight object setting up all its related children entities, so
     * that each one of them has an updated reference to its parent. This is
     * required to prevent the foreign keys from having null values.
     */
    //</editor-fold>
    public static void persistFlight(Flight flight) {
        List<FlightItinerary> itineraries = flight.getItineraries()
                .stream()
                .map(itinerary -> {
                    itinerary.setFlight(flight);

                    List<FlightSegment> segments = itinerary.getSegments()
                            .stream()
                            .map(segment -> {
                                segment.setFlightItinerary(itinerary);

                                List<PlaceRelation> placeRelations = segment.getPlaceRelations()
                                        .stream()
                                        .map(pr -> {
                                            pr.setFlightSegment(segment);
                                            return pr;
                                        }).collect(Collectors.toList());

                                segment.setPlaceRelations(placeRelations);
                                return segment;

                            }).collect(Collectors.toList());

                    itinerary.setSegments(segments);
                    return itinerary;
                })
                .collect(Collectors.toList());

        flight.setItineraries(itineraries);

    }
}
