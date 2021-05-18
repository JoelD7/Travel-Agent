package com.tripper.Tripper.models;

import java.io.Serializable;
import java.time.LocalDateTime;
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
public class Restaurant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idRestaurant")
    private Long idRestaurant;

    private String id;
    private String name;
    private String image_url;
    private Integer rating;
    private String display_address;
    private String cuisines;
    private LocalDateTime visitDate;

}
