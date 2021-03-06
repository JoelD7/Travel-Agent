package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tripper.Tripper.models.enums.CarFeatures;
import com.tripper.Tripper.models.enums.CarTransmission;
import com.tripper.Tripper.utils.CarFeaturesSetConverter;
import java.sql.Blob;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.EnumSet;
import java.util.List;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
    @JsonIgnore
    private Person person;

    @OneToOne
    @JoinColumn(name = "idEvent")
    @JsonBackReference(value = "carReference")
    @Setter(AccessLevel.PRIVATE)
    private TripEvent event;

    private String name;

    @Convert(converter = CarFeaturesSetConverter.class)
    @Column(name = "features")
    private EnumSet<CarFeatures> features;

    private Integer seats;
    private Integer doors;
    private Double cost;
    private String image;
    private LocalDateTime pickupDate;
    private LocalDateTime dropoffDate;
    private String location;

    @Enumerated(EnumType.STRING)
    private CarTransmission transmission;
    private String mpg;

    public void setTripEvent(TripEvent event) {
        this.setEvent(event);
        event.setCarRental(this);
    }
}
