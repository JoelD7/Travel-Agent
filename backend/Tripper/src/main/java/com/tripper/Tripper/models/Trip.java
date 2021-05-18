package com.tripper.Tripper.models;

import java.sql.Blob;
import java.time.LocalDate;
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
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idTrip")
    private Long idTrip;

    private String name;
    private String countries;
    private Double budget;
    private LocalDate startDate;
    private LocalDate endDate;
    private Blob coverPhoto;

    @ManyToOne
    @JoinColumn(name = "idPerson")
    private Person person;

    @OneToMany(mappedBy = "trip")
    private List<Album> albums = new ArrayList<>();
}
