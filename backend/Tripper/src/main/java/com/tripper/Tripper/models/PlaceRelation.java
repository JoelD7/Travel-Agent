package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tripper.Tripper.models.enums.PlaceRelationType;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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

    @ManyToOne
    @JoinColumn(name = "idFlightSegment")
    @JsonIgnore
    private FlightSegment flightSegment;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPlaceRelation")
    private Long idPlaceRelation;

    private String iataCode;
    private String city;
    private String terminal;
    private LocalDateTime at;
    @Enumerated(EnumType.STRING)
    private PlaceRelationType type;

}
