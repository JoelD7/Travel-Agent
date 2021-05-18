package com.tripper.Tripper.models;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class POI {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idPoi")
    private Long idPoi;

    private String id;
    private String name;
    private LocalDate visitDate;
    private String formattedAddress;
    private String imageUrl;
    private Integer rating;
    private String category;
    private String categoryIconUrl;
}
