package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
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
    @JsonIgnore
    private FlightItinerary flightItinerary;

    @OneToMany(mappedBy = "flightSegment", cascade = CascadeType.ALL)
    List<PlaceRelation> placeRelations = new ArrayList<>();

}
