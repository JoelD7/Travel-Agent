package com.tripper.Tripper.models;

import com.tripper.Tripper.models.enums.PlaceRelationType;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class PlaceRelation {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPlaceRelation")
    private Long idPlaceRelation;

    private String iataCode;
    private String city;
    private Integer terminal;
    private LocalDateTime at;
    private PlaceRelationType type;

    @ManyToOne
    @JoinColumn(name = "idFlightSegment")
    private FlightSegment flightSegment;
}
