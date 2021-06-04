package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.tripper.Tripper.models.enums.FavoritePlace;
import java.io.Serializable;
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
import javax.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Favorite implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idFavorite")
    private Long idFavorite;

    private String code;
    @Enumerated(EnumType.STRING)
    private FavoritePlace type;

    @ManyToOne
    @JoinColumn(name = "idPerson")
    @JsonBackReference(value = "favoriteReference")
    private Person person;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "favorite")
    @JsonManagedReference(value = "restaurantFavReference")
    private Restaurant restaurant;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "favorite")
    @JsonManagedReference(value = "poiFavReference")
    private POI poi;

}
