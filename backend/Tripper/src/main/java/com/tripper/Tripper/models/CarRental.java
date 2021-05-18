package com.tripper.Tripper.models;

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
import lombok.Data;
import lombok.NoArgsConstructor;

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
}
