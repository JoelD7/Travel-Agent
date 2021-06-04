package com.tripper.Tripper.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@NoArgsConstructor
public class Restaurant implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "idRestaurant")
    private Long idRestaurant;

    @OneToOne
    @JoinColumn(name = "idEvent")
    @JsonBackReference(value = "restaurantReference")
    @Setter(AccessLevel.PRIVATE)
    private TripEvent event;

    @OneToOne
    @JoinColumn(name = "idFavorite")
    @JsonBackReference(value = "restaurantFavReference")
    @Setter(AccessLevel.PRIVATE)
    private Favorite favorite;

    private String id;
    private String name;
    private String imageUrl;
    private Integer rating;
    private String displayAddress;
    private String cuisines;
    private LocalDateTime visitDate;

    public void setTripEvent(TripEvent event) {
        this.setEvent(event);
        event.setRestaurant(this);
    }

    public void setFavoriteRestaurant(Favorite favorite) {
        this.setFavorite(favorite);
        favorite.setRestaurant(this);
    }

}
