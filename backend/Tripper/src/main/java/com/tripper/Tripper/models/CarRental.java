package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.tripper.Tripper.models.enums.CarFeatures;
import com.tripper.Tripper.models.enums.CarTransmission;
import java.sql.Blob;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
public class CarRental {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idCarRental")
    private Long idCarRental;

    @ManyToOne
    @JoinColumn(name = "idPerson")
    private Person person;

    @OneToOne
    @JoinColumn(name = "idEvent")
    @JsonBackReference(value = "carReference")
    @Setter(AccessLevel.PRIVATE)
    private TripEvent event;

    private String name;
    private CarFeatures features;
    private Integer seats;
    private Integer doors;
    private Double cost;
    private Blob image;
    private LocalDate pickupDate;
    private LocalDate dropoffDate;
    private String location;
    private CarTransmission transmission;
    private String mpg;

    public void setTripEvent(TripEvent event) {
        this.setEvent(event);
        event.setCarRental(this);
    }
}
